import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Header from '../components/header'
import PrivateRoute from '../components/private_route'

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
              <PrivateRoute path="/dashboard" component={Home} />
              <Route path="/login" component={SignInPage} />
              <Route path="/registration" component={SignUpPage} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default App
