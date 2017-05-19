import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { indexFolders, deleteFolder } from '../actions/folders'

import DashboardHeader from '../components/dashboard_header'
import DashboardForm from '../components/dashboard_form'
import FoldersList from '../components/folders_list'

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.indexFolders()
  }

  render() {
    const { folders, isLoaded, deleteFolder } = this.props
    return(
      <div>
        <div className="">
          <div className="">
            <DashboardHeader/>
          </div>
          <div className="">
            <DashboardForm/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <FoldersList
              folders={ folders }
              isLoaded={ isLoaded }
              deleteItem={ deleteFolder }
            />
          </div>
          <div className="col-sm-8">
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  folders:      PropTypes.array.isRequired,
  isLoaded:     PropTypes.bool.isRequired,
  indexFolders: PropTypes.func.isRequired,
  deleteFolder: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  const { folders } = state
  const { items, isLoaded } = folders
  return {
    folders:  items,
    isLoaded: isLoaded,
  }
}

export default connect(mapStateToProps, { indexFolders, deleteFolder })(Dashboard)
