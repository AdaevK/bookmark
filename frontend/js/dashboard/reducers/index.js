import { combineReducers } from 'redux'
import { i18nReducer } from 'react-redux-i18n'

import session from './sessions'
import registration from './registration'
import folders from './folders'
import folder from './folder'

const rootReducer = combineReducers({
  session,
  registration,
  folders,
  folder,
  i18n: i18nReducer
})

export default rootReducer
