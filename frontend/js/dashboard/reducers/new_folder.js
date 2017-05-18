import {
  NEW_FOLDER_REQUEST,
  NEW_FOLDER_SUCCESS,
  NEW_FOLDER_FAILURE
} from '../constants/action_types'

const initState = {
  submitting: false,
  errors: null
}

const newFolder = (state = initState, action) => {
  switch (action.type) {
    case NEW_FOLDER_REQUEST:
      return {
        ...state,
        submitting: true,
        errors: null
      }

    case NEW_FOLDER_SUCCESS:
      return {
        ...state,
        submitting: false,
        errors: null
      }

    case NEW_FOLDER_FAILURE:
      return {
        ...state,
        submitting: false,
        errors: action.errors
      }

    default:
      return state
  }
}

export default newFolder
