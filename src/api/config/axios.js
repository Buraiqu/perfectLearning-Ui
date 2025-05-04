/**
 * Axios configuration with interceptors
 * This file sets up the axios instance with default configurations and interceptors
 */

import axios from 'axios';
import env from './env';
import { requestInterceptor, responseInterceptor, errorInterceptor } from '../interceptors';

// For authenticated endpoints (includes cookies)
const axiosAuthInstance = axios.create({
  baseURL: `${env.API_BASE_URL}`,
  timeout: env.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // Always include credentials for auth requests
});

// For public endpoints (no cookies needed)
const axiosPublicInstance = axios.create({
  baseURL: `${env.API_BASE_URL}`,
  timeout: env.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false, // Don't include credentials for public requests
});

// Add request interceptor
axiosAuthInstance.interceptors.request.use(
  requestInterceptor,
  error => Promise.reject(error)
);

// Add response interceptors
axiosAuthInstance.interceptors.response.use(
  responseInterceptor,
  errorInterceptor
);

export { axiosAuthInstance as default, axiosPublicInstance };
