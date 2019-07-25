import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { BrowserRouter } from 'react-router-redux'
import { Provider } from 'react-redux'

import CoreLayout from '../router'

interface IAppContainer {
  store: any
  history: any
}

const AppContainer = ({ store, history }: IAppContainer) => {
  return (
    <Provider store={store}>
      {/* <BrowserRouter basename={'/myrootpath'}> */}
      <ConnectedRouter history={history}>
        <CoreLayout />
      </ConnectedRouter>
      {/* </BrowserRouter> */}
    </Provider>
  )
}

export default AppContainer
