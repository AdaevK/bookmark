import request from 'axios'

const apiPath = '/api/v1'

const authHeader = () => {
  return {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('bookmarksAuthToken')}`
    }
  }
}

const api = {
  signUp: (data) => {
    return request.post(`${apiPath}/registrations`, data)
  },
  signIn: (data) => {
    return request.post(`${apiPath}/sessions`, data)
  },
  signOut: () => {
    return request.delete(`${apiPath}/sessions`, authHeader())
  },

  indexFolders: () => {
    return request.get(`${apiPath}/folders`, authHeader())
  },
  createFolder: (data) => {
    return request.post(`${apiPath}/folders`, data, authHeader())
  },
  editFolder: (id) => {
    return request.get(`${apiPath}/folders/${id}`, authHeader())
  },
  updateFolder: (id, data) => {
    return request.patch(`${apiPath}/folders/${id}`, data, authHeader())
  },
  deleteFolder: (id) => {
    return request.delete(`${apiPath}/folders/${id}`, authHeader())
  }
}

export default api
