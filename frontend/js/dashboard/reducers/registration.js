import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE
} from '../constants/action_types'

const initState = {
  submitting: false,
  errors: null
}

export default (state = initState, action) => {
  switch (action.type) {
    case SIGN_UP_REQUEST:
      return {
        ...state,
        submitting: true,
        errors: null
      }
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        submitting: false,
        errors: null
      }

    case SIGN_UP_FAILURE:
      return {
        ...state,
        submitting: false,
        errors: action.errors
      }

  default:
    return state
  }
}
