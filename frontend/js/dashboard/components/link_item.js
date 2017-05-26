import React from 'react'
import PropTypes from 'prop-types'
import { I18n } from 'react-redux-i18n'

const LinkItem = ({ link, deleteItem }) => {
  const handleDelete = (id) => {
    if(confirm(I18n.t('confirmation.delete_link'))) {
      deleteItem(id)
    }
  }

  return (
    <li className="link">
      <i className="dot"/>
      <div>
        <a href={ link.url } target="_blank">{ link.name.length ? link.name : link.url }</a>
        <span className="pull-right">
          <div className="btn-group btn-group-sm">
            <div className="btn btn-default"
                 onClick={ handleDelete.bind(this, link.id) }>
              <i className="fa fa-trash"/>
            </div>
          </div>
        </span>
      </div>
    </li>
  )
}

LinkItem.propsTypes = {
  link:       PropTypes.object.isRequired,
  deleteItem: PropTypes.func.isRequired
}

export default LinkItem
