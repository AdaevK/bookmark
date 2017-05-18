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
    return request.post(apiPath + '/registrations', data)
  },
  signIn: (data) => {
    return request.post(apiPath + '/sessions', data)
  },
  signOut: () => {
    return request.delete(apiPath + '/sessions', authHeader())
  },

  createFolder: (data) => {
    return request.post(apiPath + '/folders', data, authHeader())
  },
  indexFolders: () => {
    return request.get(apiPath + '/folders', authHeader())
  },
}

export default api
