import request from 'axios'

const apiPath = '/api/v1'

const api = {
  signUp: (data) => {
    return request.post(`${apiPath}/registrations`, data)
  },
  signIn: (data) => {
    return request.post(`${apiPath}/sessions`, data)
  },
  signOut: () => {
    return request.delete(`${apiPath}/sessions`)
  },

  indexFolders: () => {
    return request.get(`${apiPath}/folders`)
  },
  createFolder: (data) => {
    return request.post(`${apiPath}/folders`, data)
  },
  showFolder: (id) => {
    return request.get(`${apiPath}/folders/${id}`)
  },
  editFolder: (id) => {
    return request.get(`${apiPath}/folders/${id}/edit`)
  },
  updateFolder: (id, data) => {
    return request.patch(`${apiPath}/folders/${id}`, data)
  },
  deleteFolder: (id) => {
    return request.delete(`${apiPath}/folders/${id}`)
  },

  createLinkToFolder: (folderId, data) => {
    return request.post(`${apiPath}/folders/${folderId}/links`, data)
  }
}

export default api
