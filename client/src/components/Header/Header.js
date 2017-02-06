import React, { Component } from 'react'
import logo from '../../../public/assets/logo-mini.png'
import { Layout, Menu } from 'antd'
const SubMenu = Menu.SubMenu

import './Header.less'

class Header extends Component {
  render () {
    return (
      <Layout.Header>
        <Menu
          className='header-menu'
          theme="dark"
          mode="horizontal"
          style={{
            float: 'right'
          }}
        >
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Layout.Header>
    )
  }
}

export default Header
