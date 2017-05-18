import {
  LOAD_FOLDERS_REQUEST,
  LOAD_FOLDERS_SUCCESS,
  LOAD_FOLDERS_FAILURE,

  ADD_FOLDER_SUCCESS,
} from '../constants/action_types'

const initState = {
  items: [],
  isLoaded: false,
}

export default (state = initState, action) => {
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
    case ADD_FOLDER_SUCCESS:
      const items = [...state.items, action.folder]
      return {
        ...state,
        items
      }
    default:
      return state
  }
}
