/**
 * Created by H
 * User: huangcan
 * Date: 2018/11/6
 * Time: 4:48 PM
 */
import React, {PureComponent} from "react"
import {connect} from 'react-redux'
import {DebounceInput} from 'react-debounce-input'
import {actionCreators} from "./store/"
import SearchList from 'components/searchList/'
import withRef from 'components/withRef'
import {Link} from 'react-router-dom'
import style from './index.module.scss'


const mapStateToProps = (state) => ({
  keyWord: state.getIn(['searchInput', 'keyWord']),
  historyList: state.getIn(['searchInput', 'searchHistoryList']),
  searchResultList: state.getIn(['searchInput', 'searchResultList'])
})

const mapDispatchToProps = (dispatch) => ({
  changeKeyWord(data) {
    dispatch(actionCreators.changeKeyWord(data))
  },
  changeKeyWordList(key, e) {
    if (key[e.target.value.trim()] !== undefined) {
      dispatch(actionCreators.changeKeyWord(e.target.value.trim()))
      return
    }
    dispatch(actionCreators.getKeyWordsList(e.target.value.trim()))
  },
  clearSearchHistory() {
    dispatch(actionCreators.clearSearchHistory())
  }
})

@connect(mapStateToProps, mapDispatchToProps)
@withRef
class SearchInput extends PureComponent {

  componentWillUnmount() {
    this.props.changeKeyWord('')
  }

  render() {
    const {
      historyList,
      keyWord,
      searchResultList,
      changeKeyWordList,
      clearSearchHistory,
      changeKeyWord,
      props,
      navigation
    } = this.props
    return (
        <div className={style.box}>
          <DebounceInput
              placeholder={'请输入剧名或链接'}
              className={style.input}
              debounceTimeout={500}
              onChange={(e) => {
                changeKeyWordList(searchResultList, e)
              }}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  keyWord && navigation.push('/details/' + keyWord)
                }
              }}
              value={keyWord}
          />
          <Link
              className={style.btn}
              to={keyWord ? '/details/' + keyWord : props['url']}
          >
            Search
          </Link>
          {

            <div>
              <div className={keyWord && props.params && style['drop-down']}>
                {
                  historyList.size > 0
                  &&
                  <div className={style.history}>
                    搜索历史:
                    {
                      historyList.map((v, i) => (
                          <span
                              className={style.item}
                              key={i}
                              onClick={(e) => {
                                e.nativeEvent.stopImmediatePropagation()
                                changeKeyWord(v)
                              }}
                          >
                      {v}
                    </span>
                      ))
                    }
                    <span className={style.clear} onClick={clearSearchHistory}>Clear</span>
                  </div>
                }
                {
                  searchResultList[keyWord] && <SearchList props={searchResultList[keyWord].data}/>
                }
              </div>
            </div>
          }
        </div>
    )
  }

}

export default SearchInput