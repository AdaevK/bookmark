import api from '../api'
import {
  ADD_FOLDER_REQUEST,
  ADD_FOLDER_SUCCESS,
  ADD_FOLDER_FAILURE,

  LOAD_FOLDERS_REQUEST,
  LOAD_FOLDERS_SUCCESS,
  LOAD_FOLDERS_FAILURE,

  DELETE_FOLDER_SUCCESS,
} from '../constants/action_types'

const addFolderRequest = () => ({type: ADD_FOLDER_REQUEST})
const addFolderSuccess = (folder) => ({type: ADD_FOLDER_SUCCESS, folder})
const addFolderFailure = (errors) => ({type: ADD_FOLDER_FAILURE, errors})

export const createFolder = (folder) => {
  return dispatch => {
    const data = {
      folder
    }

    dispatch(addFolderRequest())
    api.createFolder(data)
      .then((response) => {
        const { data } = response
        dispatch(addFolderSuccess(data.folder))
      })
      .catch((error) => {
        const { data } = error.response
        dispatch(addFolderFailure(data.errors))
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

const deleteFolderSuccess = (id) => ({type: DELETE_FOLDER_SUCCESS, id: id})

export const deleteFolder = (id) => {
  return dispatch => {
    api.deleteFolder(id)
      .then(() => {
        dispatch(deleteFolderSuccess(id))
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
