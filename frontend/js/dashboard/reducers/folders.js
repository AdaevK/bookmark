import {
  LOAD_FOLDERS_REQUEST,
  LOAD_FOLDERS_SUCCESS,
  LOAD_FOLDERS_FAILURE,

  ADD_FOLDER_SUCCESS,
  UPDATE_FOLDER_SUCCESS,

  DELETE_FOLDER_SUCCESS,
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
      return {
        ...state,
        items: [...state.items, action.folder]
      }
    case UPDATE_FOLDER_SUCCESS:
      const foundIndex = state.items.findIndex(i => i.id === action.folder.id)
      if (foundIndex >= 0) state.items[foundIndex] = action.folder
      return state
    case DELETE_FOLDER_SUCCESS:
      return {
        ...state,
        items: state.items.filter(item => item.id != action.id)
      }
    default:
      return state
  }
}
