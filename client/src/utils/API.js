import axios from 'axios';

export function getCurrentUser(headers) {
   return axios.get('/user', { ...headers });
}

export function login(credentials) {
   return axios.post('/user/login', credentials);
}

export function signup(data) {

}

export function getFoods(headers) {
   return axios.get('/api/foods', { ...headers });
}

export function newFood(data, headers) {
   return axios.post('/api/foods', data, { ...headers });
}

export function editFood(id, data, headers) {
   return axios.put(`/api/foods/${id}`, data, { ...headers });
}

export function deleteFood(id, headers) {
   return axios.delete(`/api/foods/${id}`, { ...headers });
}