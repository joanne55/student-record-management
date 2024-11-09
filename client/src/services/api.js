// client/src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

// Add auth token to requests
api.interceptors.request.use(config => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export const auth = {
  login: (credentials) => api.post('/login', credentials),
  register: (data) => api.post('/register', data)
};

export const data = {
  getAll: (type) => api.get(`/${type}`),
  getOne: (type, id) => api.get(`/${type}/${id}`),
  create: (type, data) => api.post(`/${type}`, data),
  update: (type, id, data) => api.put(`/${type}/${id}`, data),
  delete: (type, id) => api.delete(`/${type}/${id}`),
  createGrade: (data) => api.post('/grades', data),
  updateGrade: (id, data) => api.put(`/grades/${id}`, data)
};