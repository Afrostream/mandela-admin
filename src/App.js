import React, { Component } from 'react';
import LoginBox from './components/LoginBox/LoginBox'
import LoginView from './components/LoginView/LoginView'
import Admin from './components/Admin/Admin'
import { Router, Route, browserHistory } from 'react-router'


class App extends Component {
  render () {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={LoginView}/>
        <Route path='/admin' component={Admin}/>
      </Router>
    );
  }
}

export default App;
