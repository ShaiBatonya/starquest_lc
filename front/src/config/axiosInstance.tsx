import axios, { AxiosInstance } from 'axios';
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? 'https://starquest-upload-production-a0cc.up.railway.app/api'
    : 'http://localhost:6500/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

export default axiosInstance;
