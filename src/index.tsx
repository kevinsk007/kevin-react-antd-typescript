import React from 'react'
import ReactDOM from 'react-dom'
// import { createStore, applyMiddleware, compose } from 'redux'
// import createSagaMiddleware from 'redux-saga'
// import { rootReducer } from './redux'
import { Provider } from 'react-redux'
import { rootSaga } from './sagas'
import { store, runSaga } from './store'
import './index.scss'
import Root from './router'

runSaga(rootSaga)
ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root'),
)
