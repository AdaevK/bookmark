import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import * as reducers from './reducers'
import App from './containers/app'

const middleware = [thunk]
const reducer = combineReducers(reducers)
const store = createStore(
    reducer,
    applyMiddleware(...middleware)
)

render((
      <Provider store={store} >
        <App/>
      </Provider>
), document.getElementById('app'))
