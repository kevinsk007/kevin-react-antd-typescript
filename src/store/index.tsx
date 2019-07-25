import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../redux'
import { routerMiddleware } from 'connected-react-router'
import history from '../history'
import { rootSaga } from '../sagas'

// export { store, runSaga }

const rootStore = () => {
  const middleware = []
  const sagaMiddleware = createSagaMiddleware()
  const runSaga = initialState => {
    sagaMiddleware.run(initialState)
  }
  // const middleware = routerMiddleware(history)
  middleware.push(routerMiddleware(history))
  middleware.push(sagaMiddleware)
  const store = createStore(
    rootReducer(history),
    compose(
      applyMiddleware(...middleware),
      window['__REDUX_DEVTOOLS_EXTENSION__'] ? window['__REDUX_DEVTOOLS_EXTENSION__']() : f => f,
    ),
  )
  // store['runSaga'] = runSaga
  runSaga(rootSaga)
  // const action = type => store.dispatch({ type })
  return store
}
export default rootStore()
