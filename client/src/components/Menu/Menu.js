import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Menu as MenuAntd, Icon } from 'antd'
import logo from '../../../public/assets/logo-mini.png'

@connect(({Layout}) => ({Layout}))
class Menu extends Component {

  renderMenu (links, parentPath) {
    parentPath = parentPath || '/'

    return links.map((link, key) => {

      if (link.children) {
        return (
          <MenuAntd.SubMenu key={link.target} title={<span>{link.icon ?
            <Icon type={link.icon}/> : ''}
            {link.label}</span>}>
            {this.renderMenu(link.children, parentPath + link.target + '/')}
          </MenuAntd.SubMenu>
        )
      } else {
        return (<MenuAntd.Item key={`menu-${key}`}>
          <Link to={link.target}>
            {link.icon ? <Icon type={link.icon}/> : ''}
            {link.label || ''}
          </Link>
        </MenuAntd.Item>)
      }
    })
  }

  render () {

    const {
      props: {}
    } = this


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
      }
    ]

    return (
      <div className="menu-content">
        <a role="button" className="btn-home">
          <img src={logo} className="app-logo" alt="logo"/>
          <span>
            Afrostream
            </span>
        </a>
        <MenuAntd {...this.props} mode={'inline'}>
          {this.renderMenu(links)}
        </MenuAntd>
      </div>
    )
  }
}

Menu.propTypes = {
  theme: PropTypes.string
}

Menu.propTypes = {
  theme: 'light'
}

export default Menu
