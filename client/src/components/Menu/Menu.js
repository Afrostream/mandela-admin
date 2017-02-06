import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Menu as MenuAntd, Icon, Switch } from 'antd'
import * as LayoutActionCreators from '../../actions/layout'
import logo from '../../../public/assets/logo-mini.png'
@connect(({Layout}) => ({Layout}))
class Menu extends Component {

  changeTheme (value) {
    const {props:{dispatch, Layout}} =this

    let layoutState = Layout.get('state')
    layoutState = layoutState.set('theme', value ? 'light' : 'dark')

    dispatch(LayoutActionCreators.setState(layoutState))
  }

  toggleSideBar () {
    const {props:{dispatch, Layout}} =this

    let layoutState = Layout.get('state')
    layoutState = layoutState.set('sideBarOpen', !layoutState.get('sideBarOpen'))
    dispatch(LayoutActionCreators.setState(layoutState))
  }

  renderMenu ({links, parentPath, forceLabel}) {

    const {props:{collapsed}} =this

    parentPath = parentPath || '/'

    return links.map((link, key) => {

      if (link.children) {
        return (
          <MenuAntd.SubMenu key={link.target} title={<span>{link.icon ?
            <Icon type={link.icon}/> : ''}
            {!collapsed && link.label}</span>}>
            {this.renderMenu({links: link.children, parentPath: parentPath + link.target + '/', forceLabel: true})}
          </MenuAntd.SubMenu>
        )
      } else {
        return (<MenuAntd.Item key={`menu-${key}`}>
          <Link to={link.target}>
            {link.icon ? <Icon type={link.icon}/> : ''}
            {((!collapsed || forceLabel) && link.label) || ''}
          </Link>
        </MenuAntd.Item>)
      }
    })
  }

  render () {
    const {props:{Layout, collapsed}} =this

    const theme = Layout.get('state').get('theme')

    const links = [
      {
        label: 'Home',
        icon: 'home',
        target: '/'
      },
      {
        label: 'Dashboard',
        icon: 'line-chart',
        target: '/dashboard'
      },
      {
        label: 'Static',
        icon: 'solution',
        target: '/static',
        children: [{
          label: 'Pages',
          target: '/pages',
        }]
      },
      {
        label: 'Params',
        icon: 'params',
        target: '/config'
      },
    ]

    return (
      <div className={`menu-content ${theme}`}>
        <a role="button" className="btn-home">
          <img src={logo} className="app-logo" alt="logo"/>
          {/*<span>
           Afrostream
           </span>*/}
        </a>
        <MenuAntd {...{theme}} {...this.props} mode={!collapsed ? 'inline' : 'vertical'}>
          {this.renderMenu({links})}
        </MenuAntd>
        <div className="switchtheme">
          <Switch
            checked={theme === 'light'}
            onChange={::this.changeTheme}/>
        </div>
        <div className="pane-toggle">
          <button className={`widget-pane-toggle-button ${collapsed && 'open'}`} onClick={e => ::this.toggleSideBar()}>
            <i className={`zmdi ${(collapsed && 'zmdi-menu') || 'zmdi-chevron-left'}`}/>
          </button>
        </div>
      </div>
    )
  }
}

Menu.propTypes = {
  collapsed: PropTypes.bool.required
}

Menu.propTypes = {}

export default Menu
