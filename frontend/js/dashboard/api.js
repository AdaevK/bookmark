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
  }
}

export default api
