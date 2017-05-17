import api from '../api'
import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  USER_SIGN_OUT
} from '../constants/action_types'

const signInRequest = () => ({type: SIGN_IN_REQUEST})
export const signInSuccess = (currentUser) => ({type: SIGN_IN_SUCCESS, currentUser})
const signInFailure = (errors) => ({type: SIGN_IN_FAILURE, errors})
const userSignOut   = () => ({type: USER_SIGN_OUT})

export const login = (email, password) => {
  return dispatch => {
    const data = {
      session: {
        email: email,
        password: password
      }
    }

    dispatch(signInRequest())
    api.signIn(data)
      .then((response) => {
        localStorage.setItem('bookmarksAuthToken', response.data.jwt)
        dispatch(signInSuccess())
      })
      .catch((error) => {
        console.log(error)
        const { data } = error.response
        dispatch(signInFailure(data.errors))
      })
  }
}

export const logout = () => {
  return dispatch => {
    api.signOut()
      .then(() => {
        localStorage.removeItem('bookmarksAuthToken')
        dispatch(userSignOut())
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
