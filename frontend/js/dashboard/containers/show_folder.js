import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { showFolder } from '../actions/folders'
import { deleteLinkFromFolder } from '../actions/links'

import Folder from '../components/folder'

class ShowFolder extends React.Component {
  componentDidMount() {
    this.loadFolder()
  }
  componentDidUpdate(prevProp) {
    const { pathname } = this.props.location
    const prevPathname = prevProp.location.pathname
    if (pathname !== prevPathname) {
      this.loadFolder()
    }
  }

  loadFolder() {
    const { id } = this.props.match.params
    this.props.showFolder(id)
  }

  render() {
    const { id } = this.props.match.params
    const { links, isLoaded, loadError, deleteLinkFromFolder } = this.props
    const { name } = this.props.folder
    return (
      <Folder
        folderId={ id }
        name={ name }
        pages={ links }
        error={ loadError }
        isLoaded={ isLoaded }
        deleteLink={ deleteLinkFromFolder }
      />
    )
  }
}

ShowFolder.propTypes = {
  folder:    PropTypes.shape({
    name:    PropTypes.string
  }),
  links:     PropTypes.array,
  isLoaded:  PropTypes.bool,
  loadError: PropTypes.bool,

  deleteLinkFromFolder: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  const { folder } = state
  return {
    folder: {
      name: folder.name,
    },
    links: folder.links,
    isLoaded: folder.isLoaded,
    loadError: folder.loadError
  }
}

export default connect(mapStateToProps, { showFolder, deleteLinkFromFolder })(ShowFolder)