import React from 'react'
import PropTypes from 'prop-types'

const ModalFooter = ({ isSubmit, textSubmit, textCancel, onCancel }) => (
  <div className="modal-footer">
    <button
      type="submit"
      className="btn btn-success"
      disabled={ isSubmit }
    >{ textSubmit }</button>
    <button
      type="button"
      className="btn btn-default"
      onClick={ onCancel.bind(this) }
    >{ textCancel }</button>
  </div>
)

ModalFooter.defaultProps = {
  isSubmit: false
}

ModalFooter.propTypes = {
  isSubmit:   PropTypes.bool,
  textSubmit: PropTypes.string.isRequired,
  textCancel: PropTypes.string.isRequired,
  onCancel:   PropTypes.func.isRequired
}

export default ModalFooter
