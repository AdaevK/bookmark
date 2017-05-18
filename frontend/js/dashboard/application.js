import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { loadTranslations, setLocale, syncTranslationWithStore } from 'react-redux-i18n'

import { BrowserRouter } from 'react-router-dom'

import translationsObject from './i18n/translations_object'

import { signInSuccess } from './actions/sessions'

import configureStore from './store/configure_store'

import App from './containers/app'

const store = configureStore()

syncTranslationWithStore(store)
store.dispatch(loadTranslations(translationsObject))
store.dispatch(setLocale('ru'))

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
