import React, { Component } from 'react'
import { Provider } from 'react-redux'
import LoginView from './components/LoginView/LoginView'
import Admin from './components/Admin/Admin'
import { Router, Route, browserHistory } from 'react-router'
import store from './lib/createStore'


class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={Admin}/>
        </Router>
      </Provider>
    );
  }
}

export default App
