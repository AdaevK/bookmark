import React from 'react'
import PropTypes from 'prop-types'
import { I18n } from 'react-redux-i18n'

const FolderItem = ({ folder, deleteItem }) => {
  const handleDelete = (id) => {
    if(confirm(I18n.t('confirmation.delete_folder'))) {
      deleteItem(id)
    }
  }

  return (
    <li className="folder-item">
      <i className="fa fa-folder"/>
      <span className="name">
        { folder.name }
        <span className="pull-right">
          <div className="btn-group btn-group-sm">
            <div className="btn btn-default" onClick={ handleDelete.bind(this, folder.id) }>
              <i className="fa fa-trash" />
            </div>
          </div>
        </span>
      </span>
    </li>
  )
}

FolderItem.propTypes = {
  folder:     PropTypes.object.isRequired,
  deleteItem: PropTypes.func.isRequired
}

export default FolderItem