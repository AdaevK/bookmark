import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Switch, Link } from 'react-router-dom'
import links from '../constants/links'

import { indexFolders, deleteFolder } from '../actions/folders'

import PrivateRoute from './private_route'
import FoldersList from '../components/folders_list'

import ShowFolder from './show_folder'
import NewFolder from './new_folder'
import EditFolder from './edit_folder'
import NewLink from './new_link'

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.indexFolders()
  }

  render() {
    const { folders, isLoaded, deleteFolder } = this.props
    return(
      <div className="dashboard">
        <div className="row">
          <div className="col-sm-4 folders-column">
            <div className="folders-action">
              <Link className="btn btn-success" to={ links.newFolderPath }>
                <i className="fa fa-plus"/>
                Добавить папку
              </Link>
              <div className="clearfix"/>
            </div>
            <FoldersList
              folders={ folders }
              isLoaded={ isLoaded }
              deleteItem={ deleteFolder }
            />
          </div>
          <div className="col-sm-8 folder-page">
            <Switch>
              <PrivateRoute path={ links.showFolderPath() } component={ ShowFolder } />
            </Switch>
          </div>
        </div>
        <Switch>
          <PrivateRoute path={ links.newFolderPath } component={ NewFolder }/>
          <PrivateRoute path={ links.editFolderPath() } component={ EditFolder }/>
          <PrivateRoute path={ links.newFolderLinkPath() } component={ NewLink }/>
        </Switch>
      </div>
    )
  }
}

Dashboard.propTypes = {
  folders:            PropTypes.array.isRequired,
  isLoaded:           PropTypes.bool.isRequired,
  indexFolders:       PropTypes.func.isRequired,
  deleteFolder:       PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  const { folders } = state
  const { items, isLoaded } = folders
  return {
    folders:  items,
    isLoaded: isLoaded,
  }
}

export default connect(mapStateToProps, {
  indexFolders,
  deleteFolder,
})(Dashboard)
