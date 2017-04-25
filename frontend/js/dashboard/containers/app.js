import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Header from '../components/header'
import PrivateRoute from '../components/private_route'

import Home from './home'
import SignInPage from './sign_in_page'
import Registration from './registration'
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
              <Route path="/registration" component={Registration} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default App
