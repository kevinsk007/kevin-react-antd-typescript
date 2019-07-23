import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from '../containers/login'
import Home from '../containers/home'

import { hot } from 'react-hot-loader'

class Root extends React.Component<any, any> {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/home" exact component={Home} />
            {/* <Route path="/search" component={Search} />
            <Route path="/search_result" component={SearchResult} /> */}
            {/* <Route path="/detail/:id" component={ProductDetail} />
             */}
          </Switch>
        </Router>
        {/* {error ? <ErrorToast msg={error} clearError={clearError} /> : null} */}
      </div>
    )
  }
}

export default hot(module)(Root)
