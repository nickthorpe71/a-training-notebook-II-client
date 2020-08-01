import config from '../config'

const TokenService = {
  saveAuthToken(token) {
    window.localStorage.setItem(config.TOKEN_KEY, token)
  },

  saveUserId(id) {
    window.localStorage.setItem(config.ID_KEY, id)
  },

  getAuthToken() {
    return window.localStorage.getItem(config.TOKEN_KEY)
  },

  getUserId() {
    return window.localStorage.getItem(config.ID_KEY)
  },

  clearAuthToken() {
    window.localStorage.removeItem(config.TOKEN_KEY)
  },

  clearUserId() {
    window.localStorage.removeItem(config.ID_KEY)
  },

  hasAuthToken() {
    return !!TokenService.getAuthToken()
  },

  makeBasicAuthToken(userName, password) {
    return window.btoa(`${userName}:${password}`)
  },
}

export default TokenService
