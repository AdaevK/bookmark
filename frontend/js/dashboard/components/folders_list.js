import React from 'react'
import PropTypes from 'prop-types'

import FolderItem from './folder_item'

import Loader from '../components/loader/loader'

const FoldersList = (props) => {
  const { folders, deleteItem } = props
  return (
    <ul className="folders-list">{
      folders.sort((a, b) => {
        return a.name > b.name
      })
      .map((folder) => {
        return (<FolderItem key={ folder.id } folder={ folder } deleteItem={ deleteItem }/>)
      })
    }</ul>
  )
}

FoldersList.propTypes = {
  folders: PropTypes.array.isRequired,
  deleteItem: PropTypes.func.isRequired,
}

export default Loader('folders')(FoldersList)