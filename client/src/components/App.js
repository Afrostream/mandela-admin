import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import SplitPane from 'react-split-pane'
import SearchPane from './Search/SearchPane'
import OAuth from './OAuth/OAuth'
import Menu from './Menu/Menu'
import Header from './Header/Header'
import Sidebar from 'react-sidebar'
import SidebarContent from './Sidebar/SidebarContent'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import DropContainer from './DropContainer'

import './App.less'

@connect(({Layout, User}) => ({Layout, User}))
class App extends Component {
  render () {
    const {props:{User, Layout}} =this
    const user = User.get('user')
    //if (!user) {
    {/*return <OAuth />*/
    }
    //}

    const layoutState = Layout.get('state')
    const open = layoutState.get('sideBarOpen')
    const sideBar = <SidebarContent {...{open}} ><Menu /></SidebarContent>

    const sidebarProps = {
      transitions: true,
      sidebar: sideBar,
      docked: false,
      open,
      sidebarClassName: 'sidebar'
    }

    return (
      <div className="app">
        <Sidebar {...sidebarProps}>
          <Header/>
          <SplitPane className="split-container" split="vertical" minSize={200} maxSize={1000} defaultSize={1000}>
            <DropContainer {...this.props}/>
            <SearchPane {...this.props}/>
          </SplitPane>
        </Sidebar>
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(withRouter(App))
