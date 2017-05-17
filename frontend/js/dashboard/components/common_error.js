import React from 'react'
import PropTypes from 'prop-types'
import { I18n } from 'react-redux-i18n'

const CommonError = (props) => {
    const { errors, positionClass, wrapperClass } = props
    const commoError = errors ? !!errors['common'] : null

    return commoError && (
        <div className="form-group has-error">
          <div className={wrapperClass}>
            <span className={["help-block", positionClass].join(' ')} >{I18n.t('errors.' + errors['common'])}</span>
          </div>
        </div>
    )
}

CommonError.propTypes = {
  errors:        PropTypes.object,
  positionClass: PropTypes.string,
  wrapperClass:  PropTypes.string,
}

export default CommonError