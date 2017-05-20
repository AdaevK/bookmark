import React from 'react'

export default ({ children }) => {
  return (
    <div>
      <div className="modal fade in" style={{display: 'block'}}>
        <div className="modal-dialog">
          <div className="modal-content">
            { children }
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade in"></div>
    </div>
  )
}
