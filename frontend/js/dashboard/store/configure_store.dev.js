import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from '../reducers'

export default function configureStore(history) {
  const middleware = [thunk, routerMiddleware(history)]

  const store = createStore(
    reducers,
    composeWithDevTools(
      applyMiddleware(...middleware)
    )
  )

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
