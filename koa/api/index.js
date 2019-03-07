/**
 * Created by H
 * User: huangcan
 * Date: 2018/10/9
 * Time: 1:54 PM
 * @parma name url
 */
const axios = require('axios')

const cheerio = require('cheerio')

const querystring = require('querystring')

const load = (res) => cheerio.load(res)

const url = `https://www.a6a6.org/`

const vip = `//jx.wslmf.com/?url=`

// `http://api.baiyug.vip/?url=`
// jx.itaoju.top/?url=
// jx.wslmf.com/?url=
// api.smq1.com/?url=

const headers = {
  referer: url,
  host: 'www.a6a6.org'
}

// 获取a6a6隐藏key值，方便后面抓取数据。
const index = async (ctx, next) => {
  await axios.get(url).then(res => {
    const $ = load(res.data)
    ctx.body = {'key': $('[name=playjm]').val()}
  })
}

//a6a6搜索api转发，并添加一个url链接。
const search = async (ctx, next) => {
  await axios.get(`${url}xiala_ajax.php`, {
    headers: headers,
    params: ctx.request.body
  }).then(res => {
    ctx.body = res.data
  })
}

//抓取数据详情页,同时转接video地址
const details = async (ctx, next) => {

  let obj = {"data": [], "msg": 'ok', "status": "1"}

  try {
    const remoto = `${url}?url=${encodeURIComponent(ctx.request.body.name)}&playjm=${ctx.request.body.key}`

    await axios.get(remoto).then(async (res) => {

      const $ = load(res.data)

      let source = {}

      $('.line-small').each(function (i, v) {

        const el = $(v)

        const tab = el.find('.tab-nav').children()

        source = {
          "imgUrl": el.find('img').attr('src'),
          "title": el.find('.word').text(),
          "starring": el.find('.bt_js').find('li').eq(0).find('span').text(),
          "director": el.find('.bt_js').find('li').eq(1).find('span').text(),
          "area": el.find('.sm_w').find('span').eq(0).text(),
          "year": el.find('.sm_w').find('span').eq(1).text(),
          "intro": el.find('.jj_w').text(),
          "tab": [],
          "link": []
        }

        tab.each((i, v) => {
          const a = $(v).find('a')
          const id = a.attr('href')
          const txt = a.text().trim()
          source.tab.push(txt)
          $(id).find('.play_list').each((i, v) => {
            const key = `${url}?url`
            const link = $(v).find('a')
            source.link.push({
              'source': txt,
              's_url': `${vip}${querystring.parse(link.attr('href'))[key]}`,
              'num': link.text()
            })
          })
        })

        if (source.link.length === 0){
          source.tab.push('暂无')
          source.link.push({
            'source': '暂无',
            's_url': ``,
            'num': '暂无资源！尝试使用链接进行视频解析。'
          })
        }

        source.link.reverse()

        obj.data.push(source)
      })
    })

  } catch (e) {

    obj.status = "0"

  }

  if (obj.data.length === 0) {

    obj.data = '暂无资源！尝试使用链接进行视频解析。'

  }

  ctx.body = obj

}

//返回视频拼接地址
const videoSrc = async (ctx, next) => {

  const url = ctx.request.body.url

  let obj = {"video_src": "", "msg": 'ok', "status": "1"}

  obj.video_src = `${vip}${url}`

  ctx.body = obj

}

module.exports = [
  {
    type: 'GET',
    path: '/',
    func: index
  },
  {
    type: 'POST',
    path: '/search',
    func: search
  },
  {
    type: 'POST',
    path: '/details',
    func: details
  },
  {
    type: 'POST',
    path: '/video',
    func: videoSrc
  }
]