import React from 'react'

import Loader from '../loader'

const ModalBody = ({ children }) => (
  <div className="modal-body">
    { children }
  </div>
)

export default Loader('modal-body')(ModalBody)
