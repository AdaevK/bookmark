import {
  LOAD_FOLDERS_REQUEST,
  LOAD_FOLDERS_SUCCESS,
  LOAD_FOLDERS_FAILURE,
} from '../constants/action_types'

const initState = {
  items: [],
  isLoaded: false,
}

const folders = (state = initState, action) => {
  switch (action.type) {
    case LOAD_FOLDERS_REQUEST:
      return {
        ...state,
        isLoaded: true
      }
    case LOAD_FOLDERS_SUCCESS:
      return {
        ...state,
        items: action.folders,
        isLoaded: false
      }
    case LOAD_FOLDERS_FAILURE:
      return {
        ...state,
        isLoaded: false
      }
    default:
      return state
  }
}

export default folders