import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout } from 'antd'
const {Sider} = Layout

import { withRouter } from 'react-router'
import SearchPane from './Search/SearchPane'
import OAuth from './OAuth/OAuth'
import Menu from './Menu/Menu'
import Header from './Header/Header'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import DropContainer from './DropContainer'

import './App.less'

@connect(({Layout, User}) => ({Layout, User}))
class App extends Component {
  render () {
    const {props:{User, Layout}} =this
    const user = User.get('user')
    if (!user) {
      {
        return <OAuth />
      }
    }

    const layoutState = Layout.get('state')
    const theme = layoutState.get('theme')

    const sidebarProps = {
      className: 'sidebar',
      collapsible: true,
      collapsed: !layoutState.get('sideBarOpen'),
      trigger: null
    }

    const searchProps = {
      className: 'sidebar sidebar-right',
      collapsible: true,
      width: 600,
      collapsed: !layoutState.get('searchBarOpen'),
      trigger: null
    }

    return (
      <div className={`app ant-layout ant-layout-has-sider ${theme}`}>
        <Sider {...sidebarProps}><Menu collapsed={sidebarProps.collapsed}/></Sider>
        <div className={`ant-layout`}>
          <Header/>
          <div className={`ant-layout-content`}>
            <DropContainer {...this.props}/>
          </div>
        </div>
        <Sider {...searchProps}><SearchPane {...this.props} collapsed={searchProps.collapsed}/></Sider>
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(withRouter(App))
