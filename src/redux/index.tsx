import { combineReducers } from 'redux'
import login from './login/reducer'
import { connectRouter } from 'connected-react-router'
// import { routerReducer } from 'react-router-redux'
import history from '../history'
// import search from './search/reducers'
//合并成根reducer
export default history =>
  combineReducers({
    login,
    // search,
    router: connectRouter(history),
  })

// export { rootReducer }
