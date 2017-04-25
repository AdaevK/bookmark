import React from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      rest.session.authenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}/>
      )
    )} />
)}

const mapStateToProps = (state) => {
  const { session } = state
  return {
    session: session
  }
}

export default withRouter(connect(mapStateToProps)(PrivateRoute))
