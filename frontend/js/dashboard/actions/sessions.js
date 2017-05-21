import jwtDecode from 'jwt-decode'
import api from '../utils/api'
import setAuthToken from '../utils/set_auth_token'
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
        const { jwt } = response.data
        localStorage.setItem('bookmarksAuthToken', jwt)
        setAuthToken(jwt)
        dispatch(signInSuccess(jwtDecode(localStorage.bookmarksAuthToken)['user']))
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
        setAuthToken(false)
        dispatch(userSignOut())
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
