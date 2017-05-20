import React from 'react'
import PropTypes from 'prop-types'

const ModalHeader = ({ children, handleClose }) => (
  <div className="modal-header">
    <button type="button" className="close" onClick={ handleClose.bind(this) }>
      <span>&times;</span>
    </button>
    <h4 className="modal-title">{ children }</h4>
  </div>
)

ModalHeader.propTypes = {
  handleClose: PropTypes.func.isRequired
}

export default ModalHeader