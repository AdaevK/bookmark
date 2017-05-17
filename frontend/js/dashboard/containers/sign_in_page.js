import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from '../actions/sessions'

import SignInForm from '../components/sign_in_form'

const SignInPage = (props) => {
  const { errors, submitting } = props
  return (<SignInForm signIn={ props.login } errors={ errors } submitting={ submitting } />)
}

SignInPage.propTypes = {
  errors:     PropTypes.object,
  submitting: PropTypes.bool.isRequired,
  login:      PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const { session } = state
  const { errors, submitting } = session
  return {
    errors:     errors,
    submitting: submitting,
  }
}

export default connect(mapStateToProps, { login })(SignInPage)
