import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  USER_SIGN_OUT
} from '../constants/action_types'

const initState = {
  authenticated: false,
  currentUser: null,
  errors: null
}

const session = (state = initState, action) => {
  switch (action.type) {
  case SIGN_IN_SUCCESS:
    return { ...state, authenticated: true, currentUser: action.currentUser, errors: null }

  case SIGN_IN_FAILURE:
    return { ...state, authenticated: false, errors: action.errors }

  case USER_SIGN_OUT:
    return initState

  default:
    return state
  }
}

export default session
