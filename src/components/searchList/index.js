/**
 * Created by H
 * User: huangcan
 * Date: 2018/11/8
 * Time: 4:18 PM
 */
import React from 'react'
import {Link} from 'react-router-dom'
import style from './index.module.scss'

const SearchList = (props) => {
  const data = props.props
  return (
      <div className={style.box}>
        <p className={style.result}>搜索结果:</p>
        <ul className={'clearfix'}>
          {
            data.map((v) => (
                <li className={style.item} key={v.id}>
                  <Link to={'/details/' + v.name}>
                    {v.name}
                  </Link>
                </li>
            ))
          }
        </ul>
      </div>
  )
}

export default SearchList