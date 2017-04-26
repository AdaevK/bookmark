import React from 'react'
import PropTypes from 'prop-types'
import { I18n } from 'react-redux-i18n'

const FormGroupWithError = (props) => {
  const {
    children,
    errors,
    field,
    commonError,
    wrapClassError
  } = props

  const errorMessage = errors ? errors[field] : null
  const error = commonError || !!errorMessage

  return (
    <div className={"form-group" + (error ? " has-error" : "")}>
      {children}
      {errorMessage ?
        (
          <div className={wrapClassError}>
            <span className="help-block">{I18n.t('errors.' + errorMessage)}</span>
          </div>
        ) : null}
    </div>
  )
}

FormGroupWithError.propTypes = {
  errors:         PropTypes.object,
  commonError:    PropTypes.bool,
  wrapClassError: PropTypes.string,
  field:          PropTypes.string.isRequired
}

export default FormGroupWithError
