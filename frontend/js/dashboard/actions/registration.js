import api from '../utils/api'
import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE
} from '../constants/action_types'
import links from '../constants/links'
import { notification } from './notifications'
import handleError from '../utils/handle_error'

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
        dispatch(notification.success({ content: 'registration.create', i18n: true }))
        history.push(links.loginPath)
      })
      .catch(handleError(dispatch, (errors) => {
        dispatch(signUpFailure(errors))
      }))
  }
}
