import axios from 'axios';
import storageUtil from './storage.util';

export const httpClient = axios.create({
  baseURL: 'https://portal.golpogucchophotography.com/api',
  // baseURL: 'http://localhost:3000/api',
});

httpClient.interceptors.request.use(
  (config) => {
    const token = storageUtil.getLocalAccessToken();
    if (token) {
      config.headers['authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
