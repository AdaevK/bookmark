import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import links from '../constants/links'

const NotSignedInRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      rest.authenticated ? (
        <Redirect to={{
          pathname: links.dashboardPath,
          state: { from: props.location }
        }}/>
      ) : (
        <Component {...props} />
      )
    )} />
  )
}

NotSignedInRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  const { session } = state
  const { authenticated } = session
  return {
    authenticated
  }
}

export default connect(mapStateToProps)(NotSignedInRoute)