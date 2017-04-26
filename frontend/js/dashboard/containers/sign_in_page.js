import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../actions/sessions'

import SignInForm from '../components/sign_in_form'

const SignInPage = (props) => {
  const { session } = props
  return !session.authenticated ? (
    <SignInForm signIn={props.login} errors={session.errors} submitting={session.submitting} />
  ) : (
    <Redirect to={{
      pathname: '/dashboard'
    }}/>
  )
}

SignInPage.propTypes = {
  session: PropTypes.object.isRequired,
  login:   PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const { session } = state
  return {
    session: session
  }
}

export default withRouter(connect(mapStateToProps, { login })(SignInPage))
