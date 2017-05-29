import uuid from 'uuid'
import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
  CLEAR_ALL_NOTIFICATION
} from '../constants/action_types'

export default (state = [], action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return [
        ...state,
        {
          id: uuid.v1(),
          ...action.payload
        }
      ]
    case REMOVE_NOTIFICATION:
      return state.filter(item => item.id !== action.id)
    case CLEAR_ALL_NOTIFICATION:
      return []
    default:
      return state
  }
}
