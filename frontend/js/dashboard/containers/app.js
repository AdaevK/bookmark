import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Header from './header'
import PrivateRoute from './private_route'
import NotSignedInRoute from './not_signed_in_route'
import NotificationManager from './notification_manager'
import links from '../constants/links'

import Dashboard from './dashboard'
import SignInPage from './sign_in_page'
import SignUpPage from './sign_up_page'
import NoMatch from './no_match'

const App = (props) => (
  <div>
    <Header />
    <div id="content-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12">
            <Switch>
              <PrivateRoute path={ links.dashboardPath } component={Dashboard} />
              <NotSignedInRoute path={ links.loginPath } component={SignInPage} />
              <NotSignedInRoute path={ links.registrationPath } component={SignUpPage} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
    <NotificationManager/>
  </div>
)

export default App
