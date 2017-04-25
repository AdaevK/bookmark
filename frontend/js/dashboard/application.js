import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import { BrowserRouter } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'

import { signInSuccess } from './actions/sessions'

import configureStore from './store/configure_store'

import App from './containers/app'

const store = configureStore()

if(localStorage.getItem('bookmarksAuthToken') !== null){
  store.dispatch(signInSuccess())
}

render((
  <BrowserRouter>
      <Provider store={store} >
        <App />
      </Provider>
  </BrowserRouter>
), document.getElementById('app'))
