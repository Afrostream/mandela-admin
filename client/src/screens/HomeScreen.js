import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'

class Home extends Component {

  render () {
    return (
      <div className="homeScreen">
        <h2>Mandela admin</h2>
      </div>
    )
  }

}

Home.propTypes = {}

Home.defaultProps = {}

export default withRouter(Home)
