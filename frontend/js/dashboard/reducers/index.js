import { combineReducers } from 'redux'
import { i18nReducer } from 'react-redux-i18n'

import notifications from './notifications'

import session from './sessions'
import registration from './registration'
import folders from './folders'
import folder from './folder'

const rootReducer = combineReducers({
  notifications,

  session,
  registration,
  folders,
  folder,
  i18n: i18nReducer
})

export default rootReducer
