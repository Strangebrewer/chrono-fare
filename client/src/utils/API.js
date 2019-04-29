import axios from 'axios';

export function getCurrentUser(headers) {
  return axios.get('/user', { ...headers });
}

export function login(credentials) {
  return axios.post('/user/login', credentials);
}