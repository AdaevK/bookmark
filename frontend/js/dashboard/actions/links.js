import api from '../utils/api'
import {
  ADD_LINK_SUCCESS,

  DELETE_LINK_SUCCESS
} from '../constants/action_types'

const addLinkSuccess = (link) => ({type: ADD_LINK_SUCCESS, link})

export const createLink = (folderId, link) => {
  return dispatch => {
    return api.createLinkToFolder(folderId, { link })
      .then((response) => {
        const { data } = response
        dispatch(addLinkSuccess(data.link))
      })
  }
}

const deleteLinkSuccess = (id) => ({type: DELETE_LINK_SUCCESS, id: id})

export const deleteLinkFromFolder = (folderId, id) => {
  return dispatch => {
    api.deleteLinkFromFolder(folderId, id)
      .then(() => {
        dispatch(deleteLinkSuccess(id))
      })
      .catch((error) => {
        console.log(error)
      })
  }
}