/**
 * Created by H
 * User: huangcan
 * Date: 2018/11/2
 * Time: 5:42 PM
 */
import axios from 'axios'
import Qs from 'qs'
import Storage from 'static/utils/storage'

axios.interceptors.request.use(
    config => {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      return config
    },
    err => {
      return Promise.reject(err)
    }
)

const url = 'http://182.254.184.173:3000'

export default {
  async checkKey() {
    const storage = new Storage()
    const key = storage.get('key')
    if (!key) {
      await axios({
        method: 'get',
        url: `${url}/`,
      }).then(res => {
        storage.set('key', res.data.key, 0.1)
      })
    }
  },
  commonCode(options, router) {
    return axios({
      method: 'post',
      url: `${url}/${router}`,
      data: Qs.stringify(options)
    })
  },
  searchKeyWord(name) {
    const options = {
      name
    }
    return this.commonCode(options, 'search')
  },
  getDetails(name, key) {
    const options = {
      name,
      key
    }
    return this.commonCode(options, 'details')
  },

  getVideoSrc(src) {
    return axios({
      method: 'post',
      url: `${url}/video`,
      data: Qs.stringify(src)
    })
  }

}