import React from 'react'
import PropTypes from 'prop-types'

import Loader from './loader'
import ListLinks from './list_links'

const Folder = ({name, links}) => {
  return (
    <div>
      <h2 className="folder-name">
        <i className="fa fa-folder-open"/>
        { name }
      </h2>
      <ListLinks links={ links }/>
    </div>
  )
}

Folder.propTypes = {
  name:     PropTypes.string.isRequired,
  links:    PropTypes.array.isRequired,
}

export default Loader('folder')(Folder)
