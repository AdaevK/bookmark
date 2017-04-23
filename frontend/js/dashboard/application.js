import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import configureStore from './store/configure_store'

import App from './containers/app'
import Login from './containers/login'

const history = createHistory()
const store = configureStore(history)

render((
      <Provider store={store} >
        <ConnectedRouter history={history}>
          <div>
            <Route exact path="/dashboard" component={App}/>
            <Route path="/dashboard/login" component={Login}/>
          </div>
        </ConnectedRouter>
      </Provider>
), document.getElementById('app'))
