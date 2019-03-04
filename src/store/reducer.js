/**
 * Created by H
 * User: huangcan
 * Date: 2018/11/2
 * Time: 3:39 PM
 */
import {combineReducers} from 'redux-immutable'
import {reducer as searchReducer} from 'components/searchInput/store/'
import {reducer as detailsReducer} from 'pages/details/store/'

const reducer = combineReducers({
  searchInput: searchReducer,
  details: detailsReducer
})

export default reducer
