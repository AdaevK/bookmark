import api from '../api'
import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE
} from '../constants/action_types'
import links from '../constants/links'

const signUpRequest = () => ({type: SIGN_UP_REQUEST})
const signUpSuccess = () => ({type: SIGN_UP_SUCCESS})
const signUpFailure = (errors) => ({type: SIGN_UP_FAILURE, errors})

export const signUp = (user, history) => {
  return dispatch => {
    const data = {
      user: user
    }

    dispatch(signUpRequest())
    api.signUp(data)
      .then(() => {
        dispatch(signUpSuccess())
        history.push(links.loginPath)
      })
      .catch((error) => {
        const { data } = error.response
        dispatch(signUpFailure(data.errors))
      })
  }
}
