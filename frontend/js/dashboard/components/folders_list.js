import React from 'react'
import PropTypes from 'prop-types'

import FolderItem from './folder_item'

import Loader from '../components/loader/loader'

const FoldersList = (props) => {
  const { folders } = props
  return (
    <ul className="folders-list">{
      folders.map((folder) => {
        return (<FolderItem key={ folder.id } folder={ folder }/>)
      })
    }</ul>
  )
}

FoldersList.propTypes = {
  folders: PropTypes.array.isRequired
}

export default Loader('folders')(FoldersList)