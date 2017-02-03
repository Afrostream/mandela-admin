import React, { Component } from 'react'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as SearchActionCreator from '../../actions/search'
import * as LayoutActionCreators from '../../actions/layout'
import Hit from './Hit'

import './SearchPane.less'

@connect(({Search, Layout}) => ({Search, Layout}))
class SearchPane extends Component {

  debounceSearch = _.debounce(::this.search, 400)

  search () {
    const {refs:{inputSearch}, props:{dispatch, router}} = this
    router.push({
      ...router.location,
      query: {
        q: inputSearch.value
      }
    })
    dispatch(SearchActionCreator.search(inputSearch.value))
  }

  componentDidMount () {
    const {refs:{inputSearch}, props:{router, dispatch}} = this
    const {location:{query}} =router
    // Set input to last search
    if (query.q) {
      inputSearch.value = query.q
      dispatch(SearchActionCreator.search(inputSearch.value))
    }
  }

  render () {

    const {props:{Search}} =this
    const hits = Search.get('search')
    const rows = hits && hits.get('rows')

    const count = rows && rows.reduce((sum, hit) => {
        let increment = 0
        if (sum instanceof Immutable.Map) {
          increment = sum.get('nbHits')
        } else {
          increment = sum
        }
        return increment + hit.get('nbHits')
      }) || 0

    const allHits = rows && rows.reduce((sum, hit) => {
        return sum.concat(hit.get('hits'))
      }, Immutable.fromJS([]))

    return (
      <div className="search-pane">
        <div className="search-inputs">
          <div className="btn search-button">
            <i className="zmdi zmdi-search"></i>
          </div>
          <div className="input-container">
            <input type="text" id="search-box"
                   ref="inputSearch"
                   placeholder="Search ..."
                   onChange={::this.debounceSearch}/>
            <div id="stats">{`Results : ${count}`}</div>
          </div>
        </div>
        <div className="search-hits">
          {allHits && allHits.map((data, key) => {
            let icon = ''
            switch (data.get('type')) {
              case 'serie':
              case 'movie':
                icon = 'zmdi zmdi-camera'
                break
              case 'article':
                icon = 'zmdi zmdi-file-text'
                break
              default:
                break
            }
            return <Hit key={`seach-hit-${key}`} {...{data}} {...this.props} />
          })
          }
        </div>
      </div>
    )
  }
}


SearchPane.propTypes = {}

SearchPane.defaultProps = {}

export default SearchPane
