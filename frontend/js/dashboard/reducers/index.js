import { combineReducers } from 'redux'
import { i18nReducer } from 'react-redux-i18n'

import session from './sessions'
import registration from './registration'
import newFolder from './new_folder'

const rootReducer = combineReducers({
  session,
  registration,
  newFolder,
  i18n: i18nReducer
})

export default rootReducer
