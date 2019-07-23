import { combineReducers } from 'redux'
import login from './login/reducer'
// import search from './search/reducers'
//合并成根reducer
const rootReducer = combineReducers({
  login,
  // search,
})

export { rootReducer }
