import React from 'react'
import ReactDOM from 'react-dom'
// import { createStore, applyMiddleware, compose } from 'redux'
// import createSagaMiddleware from 'redux-saga'
// import { rootReducer } from './redux'

// import { rootSaga } from './sagas'
import store from './store'
import './index.scss'
import AppContainer from './containers'
import history from './history'

// runSaga(rootSaga)
const ENTRY_POINT = document.getElementById('root')
ReactDOM.render(<AppContainer store={store} history={history} />, ENTRY_POINT)
// registerServiceWorker()
