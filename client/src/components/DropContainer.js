import React, { PropTypes, Component } from 'react'
import { DropTarget } from 'react-dnd'
import { Breadcrumb, Icon } from 'antd'

import ItemTypes from '../consts/ItemTypes'
import classSet from 'classnames'
import { connect } from 'react-redux'
import { Tabs } from 'antd'
import resolver from '../core/router-component-resolver'
import HitScreen from '../screens/HitScreen'
import * as LayoutActionCreators from '../actions/layout'

const TabPane = Tabs.TabPane

const dropTarget = {
  drop() {
    return {name: 'DropContainer'}
  },
}

@DropTarget(ItemTypes.HIT, dropTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))
@connect(({Layout}) => ({Layout}))
export default class DropContainer extends Component {

  constructor (props) {
    super(props)
    resolver.init(props)
  }

  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
  }

  componentDidMount () {
    this.updateRouteComponent(this.props)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.route !== nextProps.route) {
      this.updateRouteComponent(nextProps)
    }
  }

  //locationHasChanged (route) {
  //}
  //
  //componentDidMount () {
  //  this.props.router.listen(this.locationHasChanged)
  //}
  //
  //componentWillUnmount () {
  //  this.props.router.unregisterTransitionHook(this.locationHasChanged)
  //}

  updateRouteComponent (props) {
    const {route} =props
    resolver.resolve(route, (component) => {
      //if (me.state.C !== C) {
      //  me.setState({
      //    C: C,
      //    route: route,
      //    isIframe: false
      //  });
      //}
    })
  }

  construct () {
    const {props:{Layout}} =this
    const tabsView = Layout.get('state').get('tabs')

    return tabsView && tabsView.map((item) => {
        const icon = item.icon
        const data = item.data
        const key = data.get('_id')
        return (<TabPane
          tab={<span><i className={icon}/>{` ${data.get('title')}`} <i className="zmdi zmdi-close"
                                                                       onClick={ e => ::this.remove(key)}/></span>}
          {...{key}}>
          <HitScreen  {...{data}}/>
        </TabPane>)
      })
  }

  remove (targetKey) {

    const {props:{Layout, dispatch}} =this
    const layoutState = Layout.get('state')
    const tabsView = layoutState.get('tabs')
    const removeIndex = tabsView.findIndex((item) => {
      const data = item.data
      return data.get('_id') === targetKey
    })


    dispatch(LayoutActionCreators.setState({tabs: tabsView.delete(removeIndex)}))

  }

  render () {
    const {canDrop, isOver, connectDropTarget, children, router} = this.props
    const isActive = canDrop && isOver

    const classDrop = {
      'drop-container': true,
      'container': true,
      'can-drop': isActive
    }

    return connectDropTarget(
      <div className={classSet(classDrop)}>
        <Breadcrumb routes={router.routes}/>
        {children}
        <Tabs>
          {this.construct()}
        </Tabs>
      </div>,
    )
  }
}
