import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:6500/api',
  headers: {
    'Content-Type': 'application/json',
  },
   withCredentials: true
});

export default axiosInstance