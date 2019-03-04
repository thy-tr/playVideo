/**
 * Created by H
 * User: huangcan
 * Date: 2018/11/2
 * Time: 4:08 PM
 */
import React, {PureComponent, Fragment} from 'react'
import {connect} from 'react-redux'
import {actionCreators} from "./store/"
import SearchInput from 'components/searchInput'
import Video from 'components/video'
import TabControls from 'components/tabControls'
import Loading from 'components/loading'
import style from "./index.module.scss";
import api from 'api/'
import Storage from 'static/utils/storage'
import img from 'static/img/default.jpg'
// import style from './index.module.scss'

const mapDispatchToProps = (dispatch) => ({

  getDetails(name, key) {
    dispatch(actionCreators.getDetails(name, key))
  },

  changeContent(value) {
    dispatch(actionCreators.content(value))
  },

  changeShow(display, url) {
    const videoData = {
      display: display,
      url: url
    }
    dispatch(actionCreators.videoStateDisplay(videoData))
  }

})

const mapStateToProps = (state) => ({
  content: state.getIn(['details', 'content']),
  video: state.getIn(['details', 'video'])
})

@connect(mapStateToProps, mapDispatchToProps)

class Details extends PureComponent {

  constructor() {
    super()
    this.myRef = ''
    this.handleClick = this.handleClick.bind(this)
    this.handlePopState = this.handlePopState.bind(this)
  }

  //初始化数据
  componentDidMount() {
    this.compareData(this.props)
    window.addEventListener("popstate", this.handlePopState, false)
    document.addEventListener('click', this.handleClick)
  }

  compareData(props) {
    const {match, location, changeShow, changeContent} = props
    if (/http|https/g.test(match.params.name)) {
      this.immediatelyPlayVideo(location, changeShow, changeContent)
    } else {
      this.changeData(match.params.name)
    }
  }

  async changeData(params) {

    const storage = new Storage()

    await api.checkKey()

    const key = storage.get('key')

    this.props.getDetails(params, key)
  }

  immediatelyPlayVideo(location, changeShow, changeContent) {

    const path = location.pathname.replace(/\/details\//, '')

    api.getVideoSrc({url: path}).then((res) => {
      const url = res.data['video_src']
      changeShow(true, url)
      changeContent([])
    })
  }

  handleClick() {
    const {changeKeyWord} = this.myRef.props
    changeKeyWord('')
  }

  handlePopState() {
    this.props.history.push('/')
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.compareData(nextProps)
    }
  }

  componentWillUnmount() {
    this.props.changeContent('')
    document.removeEventListener('click', this.handleClick)
    window.removeEventListener('popstate', this.handlePopState)
  }

  render() {
    const {content, changeShow, match} = this.props

    return (
        <Fragment>
          <div className={'container-wrapper'}>
            <div className={style.details}>
              <SearchInput navigation={this.props.history} props={match} getInstance={(childCp) => {
                this.myRef = childCp
              }}/>
            </div>
            {
              (Array.isArray(content)
                  &&
                  content.map(
                      (data, index) => (
                          <div className={style['box']} key={index}>
                            <div className={'clearfix'}>
                              <div className={style['img-box']}>
                                <img src={data['imgUrl']} onError={(e) => {
                                  e.target.src = img
                                }} alt=""/>
                              </div>
                              <div className={style['intro-box']}>
                                <h3 className={style['title']}>
                                  {data.title}
                                </h3>
                                <ul className={style['intro-details']}>
                                  <li className={'ellipses'}>
                                <span className={style['starring']}>
                                 主演：
                                </span>
                                    <span>{data['starring']}</span>
                                  </li>
                                  <li className={'ellipses'}>
                                 <span className={style['director']}>
                                 导演：
                                 </span>
                                    <span>{data['director']}</span>
                                  </li>
                                  <li className={'ellipses'}>
                                    <span className={style['area']}>地区：</span>
                                    <span>{data['area']}</span>
                                  </li>
                                  <li className={'ellipses'}>
                                    <span className={style['year']}>年份：</span>
                                    <span>{data['year']}</span>
                                  </li>
                                  <li className={'m_ellipsis'} style={{'height': '70px'}}>
                                    <span>{data['intro']}</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            {
                              <div className={'tab-component'}>

                                <TabControls props={style}>
                                  {
                                    data['tab'].map((v, i) => {
                                      return (
                                          <div name={v} key={i}>
                                            <ul className={'clearfix'} name={v}>
                                              {
                                                data['link'].map((value, index) => {
                                                  if (v === value.source) {
                                                    return (
                                                        <li className={style['num']}
                                                            onClick={(e) => {
                                                              const link = e.target.getAttributeNode(['data-url']).value
                                                              changeShow(true, link)
                                                            }}
                                                            key={index}
                                                            data-url={value['s_url']}
                                                        >
                                                          {value['num']}
                                                        </li>
                                                    )
                                                  } else {
                                                    return ''
                                                  }
                                                })
                                              }
                                            </ul>
                                          </div>
                                      )
                                    })
                                  }
                                </TabControls>
                              </div>
                            }
                          </div>
                      )
                  ))
              || <div style={{'text-align': 'center', color: '#8e4a3a'}}> {content}</div>

            }
            <Video props={this.props}/>
            <Loading props={content}></Loading>
          </div>
        </Fragment>
    )
  }
}

export default Details




