import {
  LOAD_FOLDER_REQUEST,
  LOAD_FOLDER_SUCCESS,
  LOAD_FOLDER_FAILURE,

  ADD_LINK_SUCCESS
} from '../constants/action_types'

const initState = {
  id: null,
  name: '',
  links: [],
  isLoaded: false,
  loadError: false,
}

export default (state = initState, action) => {
  switch (action.type) {
    case LOAD_FOLDER_REQUEST:
      return {
        ...state,
        id: null,
        name: '',
        links: [],
        isLoaded: true,
        loadError: false
      }
    case LOAD_FOLDER_SUCCESS:
      return {
        ...state,
        id: action.folder.id,
        name: action.folder.name,
        links: action.folder.links,
        isLoaded: false,
        loadError: false
      }
    case LOAD_FOLDER_FAILURE:
      return {
        ...state,
        isLoaded: false,
        loadError: true
      }
    case ADD_LINK_SUCCESS:
      return {
        ...state,
        links: [...state.links, action.link]
      }
    default:
      return state
  }
}