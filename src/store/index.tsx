import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import createRootReducer from '../redux'
import { routerMiddleware } from 'connected-react-router'
import history from '../history'
import { rootSaga } from '../sagas'
// import { hot } from 'react-hot-loader'

export default function configureStore(preloadedState?: any) {
  // const rootStore = () => {
  const middleware = []
  const sagaMiddleware = createSagaMiddleware()
  const runSaga = initialState => {
    sagaMiddleware.run(initialState)
  }
  // const middleware = routerMiddleware(history)
  middleware.push(routerMiddleware(history))
  middleware.push(sagaMiddleware)
  const store = createStore(
    createRootReducer(history),
    compose(
      applyMiddleware(...middleware),
      window['__REDUX_DEVTOOLS_EXTENSION__'] ? window['__REDUX_DEVTOOLS_EXTENSION__']() : f => f,
    ),
  )
  // store['runSaga'] = runSaga
  runSaga(rootSaga)
  // const action = type => store.dispatch({ type })

  // Hot reloading
  if (module['hot']) {
    // Enable Webpack hot module replacement for reducers
    module['hot'].accept('../redux', () => {
      store.replaceReducer(createRootReducer(history))
    })
  }

  return store
  // }
}
// export default rootStore()
