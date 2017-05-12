import request from 'axios'
import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  USER_SIGN_OUT
} from '../constants/action_types'

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

    request.post('/api/v1/sessions', data)
      .then((response) => {
        localStorage.setItem('bookmarksAuthToken', response.data.jwt)
        dispatch(signInSuccess())
      })
      .catch((error) => {
        console.log(error)
        const { data, status } = error.response
        dispatch(signInFailure(data.errors))
      })
  }
}

export const logout = () => {
  return dispatch => {
    return request.delete('/api/v1/sessions', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('bookmarksAuthToken')}`
        }
      })
      .then((response) => {
        localStorage.removeItem('bookmarksAuthToken')
        dispatch(userSignOut())
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
