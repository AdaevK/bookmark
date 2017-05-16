import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { I18n } from 'react-redux-i18n'
import { signUp } from '../actions/registration'

import FormGroupWithError from './form_group_with_error'

class SignUpForm extends React.Component {
  handleSubmit(e) {
    e.preventDefault()
    const history  = this.props.history

    const user = {
      email:                 this.refs.email.value,
      password:              this.refs.password.value,
      password_confirmation: this.refs.passwordConfirmation.value,
      first_name:            this.refs.firstName.value,
      last_name:             this.refs.lastName.value
    }

    this.props.signUp(user, history)
  }

  render() {
    const { errors, submitting } = this.props
    const commonError = errors ? !!errors['common'] : null

    return (
      <form onSubmit={this.handleSubmit.bind(this)} className="form-horizontal form-sign-up">
        <div className="page-header">
          <h1>{I18n.t('sign_up_form.page.header')}</h1>
        </div>
        {
          commonError && (
            <div className="form-group has-error">
              <span className="help-block text-center">{I18n.t('errors.' + errors['common'])}</span>
            </div>
          )
        }
        <FormGroupWithError field="email" errors={errors} wrapClassError="col-xs-12">
          <div className="col-xs-12">
            <label htmlFor="email">{I18n.t('sign_up_form.fields.email')}</label>
            <input type="email" className="form-control" placeholder={I18n.t('sign_up_form.fields.email')} ref="email" name="email" disabled={submitting}/>
          </div>
        </FormGroupWithError>
        <FormGroupWithError field="password" errors={errors} wrapClassError="col-xs-12">
          <div className="col-xs-12">
            <label htmlFor="password">{I18n.t('sign_up_form.fields.password')}</label>
            <input type="password" className="form-control" placeholder={I18n.t('sign_up_form.fields.password')} ref="password" name="password" disabled={submitting}/>
          </div>
        </FormGroupWithError>
        <FormGroupWithError field="password_confirmation" errors={errors} wrapClassError="col-xs-12">
          <div className="col-xs-12">
            <label htmlFor="password_confirmation">{I18n.t('sign_up_form.fields.password_confirmation')}</label>
            <input type="password" className="form-control" placeholder={I18n.t('sign_up_form.fields.password_confirmation')} ref="passwordConfirmation" name="password_confirmation" disabled={submitting}/>
          </div>
        </FormGroupWithError>
        <FormGroupWithError field="first_name" errors={errors} wrapClassError="col-xs-12">
          <div className="col-xs-12">
            <label htmlFor="first_name">{I18n.t('sign_up_form.fields.first_name')}</label>
            <input type="text" className="form-control" placeholder={I18n.t('sign_up_form.fields.first_name')} ref="firstName" name="first_name" disabled={submitting}/>
          </div>
        </FormGroupWithError>
        <FormGroupWithError field="last_name" errors={errors} wrapClassError="col-xs-12">
          <div className="col-xs-12">
            <label htmlFor="last_name">{I18n.t('sign_up_form.fields.last_name')}</label>
            <input type="text" className="form-control" placeholder={I18n.t('sign_up_form.fields.last_name')} ref="lastName" name="last_name" disabled={submitting}/>
          </div>
        </FormGroupWithError>
        <div className="form-group">
          <div className="col-xs-12">
            <button type="submit" className="btn btn-lg btn-primary btn-block" disabled={submitting}>
              {I18n.t('sign_up_form.page.submit')}
            </button>
          </div>
        </div>
        <div className="form-group">
          <div className="text-center">
            <Link to="/login">{I18n.t('sign_up_form.page.sign_in_link')}</Link>
          </div>
        </div>
      </form>
    )
  }
}

SignUpForm.propTypes = {
  errors:     PropTypes.object,
  submitting: PropTypes.bool.isRequired,
  signUp:     PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const { registration } = state
  const { errors, submitting } = registration
  return {
    errors: errors,
    submitting: submitting,
  }
}

export default withRouter(connect(mapStateToProps, { signUp })(SignUpForm))