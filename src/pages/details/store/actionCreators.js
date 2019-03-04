/**
 * Created by H
 * User: huangcan
 * Date: 2018/11/2
 * Time: 4:24 PM
 */
import * as types from './actionTypes'
import api from 'api/'

export const content = (data) => ({
  type: types['CONTENTS'],
  data
})

export const videoStateDisplay = (data) => ({
  type: types['VIDEOSTATEDISPLAY'],
  data
})

export const getDetails = (name, key) => {
  return (dispatch) => {
    api.getDetails(name, key).then((res) => {
      dispatch(content(res.data.data))
    })
  }
}

