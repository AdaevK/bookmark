import React from 'react'
import PropTypes from 'prop-types'

const FolderItem = ({ folder }) => {
  return (
    <li className="folder-item">
      <i className="fa fa-folder"/>
      <span className="name">{ folder.name }</span>
    </li>
  )
}

FolderItem.propTypes = {
  folder: PropTypes.object.isRequired
}

export default FolderItem