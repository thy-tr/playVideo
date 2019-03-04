/**
 * Created by H
 * User: huangcan
 * Date: 2018/11/2
 * Time: 4:24 PM
 */
import * as types from './actionTypes'
import api from 'api/'

const changeList = (keyWordList, resultList) => ({
  type: types['CHANGE_LIST'],
  keyWordList,
  resultList
})

export const changeKeyWord = (data) => ({
  type: types['CHANGE_KEY_WORD'],
  data
})

export const clearSearchHistory = () => ({
  type: types['CLEAR_SEARCH_HISTORY']
})

export const getKeyWordsList = (key) => {

  return async (dispatch) => {

    if (key === '') {
      dispatch(changeKeyWord(key))
      return
    }

    await api.checkKey()

    api.searchKeyWord(key).then(res => {
      const data = res.data
      if (data.status === '1') {
        dispatch(changeList(key, data))
        dispatch(changeKeyWord(key))
      } else {
        dispatch(changeKeyWord(key))
      }
    })
  }
}