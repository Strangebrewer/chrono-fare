import axios from 'axios';

export function getCurrentUser(headers) {
   return axios.get('/users', { ...headers });
}

export function login(credentials) {
   // throw new Error("Fuck yeah, man!");
   return axios.post('/users/login', credentials);
}

export function searchUsers(args) {
   const { search_term, page, limit } = args;
   return axios.get(`/users/search?search_term=${search_term}&page=${page}&limit=${limit}`);
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