import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
  CLEAR_ALL_NOTIFICATION
} from '../constants/action_types'

const add = (payload) => ({type: ADD_NOTIFICATION, payload})
export const notification = {
  success: (opts) => add({ type: 'success', timeOut: 2000, ...opts }),
  info:    (opts) => add({ type: 'info', timeOut: 2000, ...opts }),
  error:   (opts) => add({ type: 'error', timeOut: 2000, ...opts }),
  warning: (opts) => add({ type: 'warning', timeOut: 2000, ...opts }),
}

const remove = (id) => ({type: REMOVE_NOTIFICATION, id})
export const removeNotification = (id) => {
  return dispatch => {
    dispatch(remove(id))
  }
}

const clearAll = () => ({type: CLEAR_ALL_NOTIFICATION})
export const clearAllNotification = () => {
  return dispatch => {
    dispatch(clearAll())
  }
}

export const obj = {
  error: (content) => {
    return addNotification('Ошибка', content)
  }
}