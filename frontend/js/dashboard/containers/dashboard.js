import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { indexFolders } from '../actions/folders'

import DashboardHeader from '../components/dashboard_header'
import DashboardForm from '../components/dashboard_form'
import DashboardList from '../components/folders_list'

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.indexFolders()
  }

  render() {
    const { folders, isLoaded } = this.props
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
            <DashboardList
              folders={ folders }
              isLoaded={ isLoaded }/>
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
}

const mapStateToProps = (state) => {
  const { folders } = state
  const { items, isLoaded } = folders
  return {
    folders:  items,
    isLoaded: isLoaded,
  }
}

export default connect(mapStateToProps, { indexFolders })(Dashboard)
