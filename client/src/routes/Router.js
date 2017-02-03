import React from 'react'
import { Router, browserHistory } from 'react-router'
import routes from './routes'

class AppRouter extends React.Component {

  render () {
    return (
      <Router
        history={browserHistory}
        {...this.props}>
        {routes}
      </Router>
    )
  }
}

export default AppRouter
