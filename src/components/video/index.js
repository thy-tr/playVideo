/**
 * Created by H
 * User: huangcan
 * Date: 2019/2/27
 * Time: 11:31 PM
 */

import React from "react"
import style from './index.module.scss'


const Video = (props) => {

  const {video, changeShow} = props.props
  return (
      <div className={video.display ? `${style['video-box']} ${style['show']} ` : style['video-box']}>
        < iframe allowFullScreen title="video" className={style['video']} src={video.url}></iframe>
        <span className={style['close']} onClick={() => {
          changeShow(false, '')
        }}></span>
      </div>
  )
}
export default Video
