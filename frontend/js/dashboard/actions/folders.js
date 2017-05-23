import api from '../utils/api'
import {
  LOAD_FOLDERS_REQUEST,
  LOAD_FOLDERS_SUCCESS,
  LOAD_FOLDERS_FAILURE,

  LOAD_FOLDER_REQUEST,
  LOAD_FOLDER_SUCCESS,
  LOAD_FOLDER_FAILURE,

  ADD_FOLDER_SUCCESS,
  UPDATE_FOLDER_SUCCESS,

  DELETE_FOLDER_SUCCESS,
} from '../constants/action_types'

const addFolderSuccess = (folder) => ({type: ADD_FOLDER_SUCCESS, folder})

export const createFolder = (folder) => {
  return dispatch => {
    return api.createFolder({ folder })
      .then((response) => {
        const { data } = response
        dispatch(addFolderSuccess(data.folder))
      })
  }
}

const loadFolderRequest = () => ({type: LOAD_FOLDER_REQUEST})
const loadFolderSuccess = (folder) => ({type: LOAD_FOLDER_SUCCESS, folder})
const loadFolderFailure = () => ({type: LOAD_FOLDER_FAILURE})

export const showFolder = (id) => {
  return dispatch => {
    dispatch(loadFolderRequest(id))
    api.showFolder(id)
      .then((response) => {
        const { data } = response
        dispatch(loadFolderSuccess(data.folder))
      })
      .catch((error) => {
        console.log(error)
        dispatch(loadFolderFailure())
      })
  }
}

export const editFolder = (id) => {
  return dispatch => {
    return api.editFolder(id)
  }
}

const updateFolderSuccess = (folder) => ({type: UPDATE_FOLDER_SUCCESS, folder})

export const updateFolder = (id, folder) => {
  return dispatch => {
    return api.updateFolder(id, { folder })
      .then((response) => {
        const { data } = response
        dispatch(updateFolderSuccess(data.folder))
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
