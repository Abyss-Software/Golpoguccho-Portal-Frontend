import axios from 'axios';
import storageUtil from './storage.util';

export const httpClient = axios.create({
  baseURL: 'http://65.0.227.130/api',
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
