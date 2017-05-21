import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { loadTranslations, setLocale, syncTranslationWithStore } from 'react-redux-i18n'
import { BrowserRouter } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import translationsObject from './i18n/translations_object'

import { signInSuccess } from './actions/sessions'

import configureStore from './store/configure_store'
import setAuthToken from './utils/set_auth_token'

import App from './containers/app'

const store = configureStore()

syncTranslationWithStore(store)
store.dispatch(loadTranslations(translationsObject))
store.dispatch(setLocale('ru'))

if(localStorage.bookmarksAuthToken) {
  setAuthToken(localStorage.bookmarksAuthToken)
  store.dispatch(signInSuccess(jwtDecode(localStorage.bookmarksAuthToken)['user']))
}

render((
  <BrowserRouter>
      <Provider store={store} >
        <App />
      </Provider>
  </BrowserRouter>
), document.getElementById('app'))
