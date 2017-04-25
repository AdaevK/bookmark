import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../actions/sessions'

import SignInForm from '../components/sign_in_form'

const SignInPage = (props) => {
  const { session } = props
  return !session.authenticated ? (
    <div>
      <div className="page-header">
        <h1> Вход </h1>
      </div>
      <SignInForm signIn={props.login}/>
    </div>
  ) : (
    <Redirect to={{
      pathname: '/dashboard'
    }}/>
  )
}

const mapStateToProps = (state) => {
  const { session } = state
  return {
    session: session
  }
}

export default withRouter(connect(mapStateToProps, { login })(SignInPage))
