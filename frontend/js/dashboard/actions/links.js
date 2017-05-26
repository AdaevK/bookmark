import api from '../utils/api'
import {
  ADD_LINK_SUCCESS
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