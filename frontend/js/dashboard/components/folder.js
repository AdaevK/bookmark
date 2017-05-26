import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import links from '../constants/links'

import Loader from './loader'
import ListLinks from './list_links'

const Folder = ({folderId, name, pages}) => {
  return (
    <div>
      <h2 className="folder-name">
        <i className="fa fa-folder-open"/>
        { name }
        <Link to={ links.newFolderLinkPath(folderId) } className="btn btn-success btn-sm pull-right">
          <i className="fa fa-plus"/> Добавить страницу
        </Link>
      </h2>
      <ListLinks links={ pages }/>
    </div>
  )
}

Folder.propTypes = {
  folderId: PropTypes.string.isRequired,
  name:     PropTypes.string.isRequired,
  pages:    PropTypes.array.isRequired,
}

export default Loader('folder')(Folder)
