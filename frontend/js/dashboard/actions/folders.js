import api from '../api'
import {
  NEW_FOLDER_REQUEST,
  NEW_FOLDER_SUCCESS,
  NEW_FOLDER_FAILURE,

  LOAD_FOLDERS_REQUEST,
  LOAD_FOLDERS_SUCCESS,
  LOAD_FOLDERS_FAILURE,
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

const loadFoldersRequest = () => ({type: LOAD_FOLDERS_REQUEST})
const loadFoldersSuccess = (data) => ({type: LOAD_FOLDERS_SUCCESS, folders: data})
const loadFoldersFailure = () => ({type: LOAD_FOLDERS_FAILURE})

export const indexFolders = () => {
  return dispatch => {
    dispatch(loadFoldersRequest())
    api.indexFolders()
      .then((response) => {
        const { data } = response
        dispatch(loadFoldersSuccess(data.folders))
      })
      .catch((error) => {
        console.log(error)
        dispatch(loadFoldersFailure())
      })
  }
}
