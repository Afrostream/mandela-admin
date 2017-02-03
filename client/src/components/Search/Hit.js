import React, { Component, PropTypes } from 'react'
import { DragSource } from 'react-dnd'
import Immutable from 'immutable'
import _ from 'lodash'
import ItemTypes from '../../consts/ItemTypes'
import { extractImg } from '../../core/utils'
import * as LayoutActionCreators from '../../actions/layout'

import './Hit.less'

const style = {}

const hitSource = {
  beginDrag(props) {
    return {
      data: props.data,
      icon: props.icon
    }
  },

  endDrag(props, monitor) {
    const {
      dispatch,
      Layout
    } = props

    const layoutState = Layout.get('state')
    const item = monitor.getItem()
    const dropResult = monitor.getDropResult()

    if (dropResult) {
      dispatch(LayoutActionCreators.setState({['tabs']: layoutState.get('tabs').push(item)}))
    }
  },
}

@DragSource(ItemTypes.HIT, hitSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
class Hit extends Component {

  openTile () {
    const {
      props:{
        dispatch,
        data,
        Layout
      }
    } = this

    const layoutState = Layout.get('state')

    const item = {
      data
    }

    dispatch(LayoutActionCreators.setState({['tabs']: layoutState.get('tabs').push(item)}))
  }

  render () {
    const {isDragging, connectDragSource} = this.props
    const {data} = this.props
    const opacity = isDragging ? 0.4 : 1
    const title = _.truncate(data && data.get('title'), {length: 30})
    const desc = _.truncate(data && data.get('synopsis'), {length: 30})
    const image = extractImg({data, fit: 'crop', keys: ['thumb', 'image'], width: 50, height: 50})
    return (
      connectDragSource(
        <article className="hit" style={{...style, opacity}} onDoubleClick={::this.openTile}>
          <div className="hit-image"
               style={{backgroundImage: `url(${image})`}}/>
          <div className="hit-meta">
            <div className="hit-type">
              {`${data.get('type')}`}
            </div>
            <div className="hit-title">
              {title}
            </div>
            <div className="hit-desc">
              {desc}
              {data.get('_id')}
            </div>
            <div className="hit-genres">
              <div className="hit-genre">
                {data.get('genre')}
              </div>
            </div>
          </div>
        </article>
      )
    )
  }
}

Hit.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  data: PropTypes.instanceOf(Immutable.Map),
}

export default Hit
