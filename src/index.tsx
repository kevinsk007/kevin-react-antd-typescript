import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from './store'
import './index.scss'
import AppContainer from './containers'
import history from './history'
const store = configureStore()

const ENTRY_POINT = document.getElementById('root')
const render = () => {
  ReactDOM.render(<AppContainer store={store} history={history} />, ENTRY_POINT)
}

render()
if (module['hot']) {
  // Reload components
  module['hot'].accept('./containers', () => {
    render()
  })
}
