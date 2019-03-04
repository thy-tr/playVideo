/**
 * Created by H
 * User: huangcan
 * Date: 2018/11/2
 * Time: 4:23 PM
 */
import {fromJS} from 'immutable'
import * as types from './actionTypes'


const defaultState = fromJS({
  content: '',
  video: {
    display: false,
    url: ''
  }
})

const changeContent = (state, action) => {
  return state.set('content', action.data)
}

const changeShow = (state, action) => {
  return state.set('video', action.data)
}


export default (state = defaultState, action) => {
  switch (action.type) {
    case types['CONTENTS']:
      return changeContent(state, action)
    case types['VIDEOSTATEDISPLAY']:
      return changeShow(state, action)
    default:
      return state
  }
}