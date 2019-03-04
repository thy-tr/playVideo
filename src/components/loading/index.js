/**
 * Created by H
 * User: huangcan
 * Date: 2019/2/28
 * Time: 2:33 PM
 */

import React from 'react'
import style from './index.module.scss'

const Loading = (props) => {
  return (
      <div className={style['loading-wrap']} style={{display: props.props ? "none" : "block"}}>
        <div className={style["spin"]}></div>
        <span className={style["txt"]}>完命加载中~</span>
      </div>
  )
}

export default Loading


