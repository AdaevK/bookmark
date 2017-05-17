import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Header from '../components/header'
import PrivateRoute from '../components/private_route'
import NotSignedInRoute from '../components/not_signed_in_route'
import links from '../constants/links'

import Home from './home'
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
              <PrivateRoute path={ links.dashboardPath } component={Home} />
              <NotSignedInRoute path={ links.loginPath } component={SignInPage} />
              <NotSignedInRoute path={ links.registrationPath } component={SignUpPage} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default App
