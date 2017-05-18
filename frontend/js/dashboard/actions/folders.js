import api from '../api'
import {
  NEW_FOLDER_REQUEST,
  NEW_FOLDER_SUCCESS,
  NEW_FOLDER_FAILURE
} from '../constants/action_types'

const newFolderRequest = () => ({type: NEW_FOLDER_REQUEST})
const newFolderSuccess = () => ({type: NEW_FOLDER_SUCCESS})
const newFolderFailure = (errors) => ({type: NEW_FOLDER_FAILURE, errors})

export const createFolder = (folder) => {
  return dispatch => {
    const data = {
      folder
    }

    dispatch(newFolderRequest())
    api.createFolder(data)
      .then(() => {
        dispatch(newFolderSuccess())
      })
      .catch((error) => {
        const { data } = error.response
        dispatch(newFolderFailure(data.errors))
      })
  }
}
