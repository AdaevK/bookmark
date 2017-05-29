import { I18n } from 'react-redux-i18n'
import { notification } from '../actions/notifications'

export default (dispatch, fn) => {
  return (response) => {
    const { data, status } = response.response
    console.log(status, data)

    const { error, errors } = data
    let resultError = error || errors

    if(typeof resultError == 'string') {
      dispatch(notification.error(
        { content: I18n.t(`errors.${resultError}`) }
      ))
      resultError = null
    }
    if(fn) fn(resultError)
  }
}
