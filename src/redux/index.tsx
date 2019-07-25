import { combineReducers } from 'redux'
import login from './login/reducer'
import { connectRouter } from 'connected-react-router'
// import history from '../history'
import { History } from 'history'
//合并成根reducer
const rootReducer = (history: History) =>
  combineReducers({
    login,
    router: connectRouter(history),
  })

export default rootReducer
