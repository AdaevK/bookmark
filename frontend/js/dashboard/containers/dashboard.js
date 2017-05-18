import React from 'react'

import DashboardHeader from '../components/dashboard_header'
import DashboardForm from '../components/dashboard_form'

const Dashboard = (props) => (
  <div>
    <div className="">
      <div className="">
        <DashboardHeader/>
      </div>
      <div className="">
        <DashboardForm/>
      </div>
    </div>
  </div>
)

export default Dashboard
