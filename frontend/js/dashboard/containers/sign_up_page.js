import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import SignUpForm from '../components/sign_up_form'

const SignUpPage = (props) => {
  const { session } = props
  return !session.authenticated ? (
    <SignUpForm/>
  ) : (
    <Redirect to={{
      pathname: '/dashboard'
    }}/>
  )
}

SignUpPage.propTypes = {
  session: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  const { session } = state
  return {
    session: session,
  }
}

export default withRouter(connect(mapStateToProps, {})(SignUpPage))
