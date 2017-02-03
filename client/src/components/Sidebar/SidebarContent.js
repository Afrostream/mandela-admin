import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as LayoutActionCreators from '../../actions/layout'

import './SidebarContent.less'

@connect(({Layout}) => ({Layout}))
class SidebarContent extends Component {

  toggleSideBar () {
    const {
      props: {
        dispatch,
        Layout,
        layoutKey
      }
    } = this

    let layoutState = Layout.get('state')
    layoutState = layoutState.set(layoutKey, !layoutState.get(layoutKey))
    dispatch(LayoutActionCreators.setState(layoutState))
  }

  render () {

    const {
      props: {
        children,
        theme,
        icon,
        open
      }
    } = this

    return (
      <div className={`sidebar-column ${theme}`}>
        {children}
        <div className="pane-toggle">
          <button className={`widget-pane-toggle-button ${open && 'open'}`} onClick={e => ::this.toggleSideBar()}>
            <i className={`zmdi ${!open && 'zmdi-menu' || 'zmdi-chevron-left'}`}/>
          </button>
        </div>
      </div>
    )
  }
}

SidebarContent.propTypes = {
  open: PropTypes.bool,
  theme: PropTypes.string
}

SidebarContent.defaultProps = {
  icon: 'zmdi zmdi-menu',
  layoutKey: 'sideBarOpen'
}

export default SidebarContent
