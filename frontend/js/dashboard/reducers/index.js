import { combineReducers } from 'redux'
import { i18nReducer } from 'react-redux-i18n'

import session from './sessions'
import registration from './registration'

const rootReducer = combineReducers({
  session,
  registration,
  i18n: i18nReducer
})

export default rootReducer
