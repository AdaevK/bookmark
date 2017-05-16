import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  USER_SIGN_OUT
} from '../constants/action_types'

const initState = {
  authenticated: false,
  submitting: false,
  currentUser: null,
  errors: null
}

const session = (state = initState, action) => {
  switch (action.type) {
    case SIGN_IN_REQUEST:
    return {
      ...state,
      submitting: true,
      errors: null
    }
  case SIGN_IN_SUCCESS:
    return {
      ...state,
      authenticated: true,
      submitting: false,
      currentUser: action.currentUser,
      errors: null
    }

  case SIGN_IN_FAILURE:
    return {
      ...state,
      authenticated: false,
      submitting: false,
      errors: action.errors
    }

  case USER_SIGN_OUT:
    return initState

  default:
    return state
  }
}

export default session
