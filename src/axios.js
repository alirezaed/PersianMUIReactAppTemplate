import axios from 'axios';

export const authInstance = axios.create({
  baseURL: process.env.REACT_APP_AUTH_BASE_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*'
  }
});

const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*'
  }
});

apiInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${window.localStorage.getItem('token')}`;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export { apiInstance };
