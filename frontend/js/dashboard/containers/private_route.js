import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import links from '../constants/links'

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      rest.authenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: links.loginPath,
          state: { from: props.location }
        }}/>
      )
    )} />
)}

PrivateRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  const { session } = state
  const { authenticated } = session
  return {
    authenticated
  }
}

export default withRouter(connect(mapStateToProps)(PrivateRoute))
