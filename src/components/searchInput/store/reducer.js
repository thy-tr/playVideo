/**
 * Created by H
 * User: huangcan
 * Date: 2018/11/2
 * Time: 4:23 PM
 */
import {fromJS} from 'immutable'
import * as types from './actionTypes'


const defaultState = fromJS({
  keyWord: '',
  searchHistoryList: [],
  searchResultList: {}
})

const changeList = (state, action) => {
  let historyList = state.get('searchHistoryList')
  let resultList = state.get('searchResultList')
  // 第一次赋值为一个空对象
  if (resultList.size === 0) {
    resultList = {}
  }
  // 只允许5条历史记录存在
  if (historyList.size >= 5) {
    historyList = historyList.remove(0)
  }
  return state.merge({
    'searchHistoryList': historyList.concat([action.keyWordList]),
    'searchResultList': {[action.keyWordList]: action.resultList, ...resultList}
  });
}

const changeKeyWord = (state, action) => {
  return state.set('keyWord', action.data)
}

const clearSearchList = (state) => {
  return state.set('searchHistoryList', fromJS([]))
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case types['CHANGE_LIST']:
      return changeList(state, action)
    case types['CHANGE_KEY_WORD']:
      return changeKeyWord(state, action)
    case types['CLEAR_SEARCH_HISTORY']:
      return clearSearchList(state)
    default:
      return state
  }
}