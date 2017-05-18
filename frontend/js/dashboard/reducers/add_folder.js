import {
  ADD_FOLDER_REQUEST,
  ADD_FOLDER_SUCCESS,
  ADD_FOLDER_FAILURE,
} from '../constants/action_types'

const initState = {
  submitting: false,
  errors: null
}

export default (state = initState, action) => {
  switch (action.type) {
    case ADD_FOLDER_REQUEST:
      return {
        ...state,
        submitting: true,
        errors: null
      }

    case ADD_FOLDER_SUCCESS:
      return {
        ...state,
        submitting: false,
        errors: null
      }

    case ADD_FOLDER_FAILURE:
      return {
        ...state,
        submitting: false,
        errors: action.errors
      }

    default:
      return state
  }
}
