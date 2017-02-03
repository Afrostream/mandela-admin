import React, { Component } from 'react'
import logo from '../../../public/assets/logo-mini.png'
import './Header.less'

class Header extends Component {
  render () {
    return (
      <header className="topbar">
        <div className="nav-content">
          <nav className="float--left">
            <a role="button" className="btn-home">
              <img src={logo} className="app-logo" alt="logo"/>
              <span>
            Afrostream
            </span>
            </a>
          </nav>
          <nav className="float--right">
          </nav>
        </div>
      </header>
    )
  }
}

export default Header
