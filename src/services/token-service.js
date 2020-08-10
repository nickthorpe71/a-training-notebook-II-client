import config from '../config';

const TokenService = {
  saveAuthToken(token) {
    window.localStorage.setItem(config.TOKEN_KEY, token);
  },

  saveUserId(id) {
    window.localStorage.setItem(config.ID_KEY, id);
  },

  saveUsername(username) {
    window.localStorage.setItem(config.USERNAME_KEY, username);
  },

  saveEmail(email) {
    window.localStorage.setItem(config.EMAIL_KEY, email);
  },

  getAuthToken() {
    return window.localStorage.getItem(config.TOKEN_KEY);
  },

  getUserId() {
    return window.localStorage.getItem(config.ID_KEY);
  },

  getUsername() {
    return window.localStorage.getItem(config.USERNAME_KEY);
  },

  getEmail() {
    return window.localStorage.getItem(config.EMAIL_KEY);
  },

  clearAuthToken() {
    window.localStorage.removeItem(config.TOKEN_KEY);
  },

  clearUserId() {
    window.localStorage.removeItem(config.ID_KEY);
  },

  hasAuthToken() {
    return !!TokenService.getAuthToken();
  },

  makeBasicAuthToken(userName, password) {
    return window.btoa(`${userName}:${password}`);
  },
};

export default TokenService;
