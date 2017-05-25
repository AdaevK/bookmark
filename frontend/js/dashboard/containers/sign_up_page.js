import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { signUp } from '../actions/registration'

import SignUpForm from '../components/sign_up_form'

const SignUpPage = (props) => {
  const { errors, submitting, history } = props
  const signUp = (user) => {
    props.signUp(user, history)
  }
  return (<SignUpForm
    errors={ errors }
    submitting={ submitting }
    signUp={signUp.bind(this)}
  />)
}

SignUpPage.propTypes = {
  errors:     PropTypes.object,
  submitting: PropTypes.bool.isRequired,
  signUp:     PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const { registration } = state
  const { errors, submitting } = registration
  return {
    errors,
    submitting
  }
}

export default withRouter(connect(mapStateToProps, { signUp })(SignUpPage))
