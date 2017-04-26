import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n'

import FormGroupWithError from './form_group_with_error'

class SignInForm extends React.Component {
  handleSubmit(e) {
    e.preventDefault()
    const history  = this.props.history

    const email    = this.refs.email.value
    const password = this.refs.password.value

    this.props.signIn(email, password)
  }

  render() {
    const { errors, submitting } = this.props
    const commonError = errors ? !!errors['common'] : null

    return (
      <form onSubmit={this.handleSubmit.bind(this)} className="form-horizontal form-sign-in">
        <div className="page-header">
          <h1>{I18n.t('sign_in_form.page.header')}</h1>
        </div>
        {
          commonError && (
              <div className="form-group has-error">
                <span className="help-block text-center">{I18n.t('errors.' + errors['common'])}</span>
              </div>
          )
        }
        <FormGroupWithError errors={errors} commonError={commonError} field="email" wrapClassError="col-xs-12">
          <div className="col-xs-12">
            <div className="input-group">
              <span className="input-group-addon"><i className="fa fa-user"></i></span>
              <input type="text" className="form-control" placeholder={I18n.t('sign_in_form.fields.email')} ref="email" disabled={submitting} />
            </div>
          </div>
        </FormGroupWithError>
        <FormGroupWithError errors={errors} commonError={commonError} field="password" wrapClassError="col-xs-12">
          <div className="col-xs-12">
            <div className="input-group">
              <span className="input-group-addon"><i className="fa fa-key"></i></span>
              <input type="password" className="form-control" placeholder={I18n.t('sign_in_form.fields.password')} ref="password" disabled={submitting} />
            </div>
          </div>
        </FormGroupWithError>
        <div className="form-group">
          <div className="col-xs-12">
            <button type="submit" className="btn btn-lg btn-primary btn-block" disabled={submitting}>
              {I18n.t('sign_in_form.page.submit')}
            </button>
          </div>
        </div>
      </form>
    )
  }
}

SignInForm.propTypes = {
  errors:     PropTypes.object,
  submitting: PropTypes.bool.isRequired,
  signIn:     PropTypes.func.isRequired
}

export default SignInForm
