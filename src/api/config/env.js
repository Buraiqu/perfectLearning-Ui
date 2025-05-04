/**
 * Environment configuration for API
 * This file centralizes all environment variables related to API configuration
 */

const env = {
  // API Base URL - defaults to localhost if not set
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  
  // Request timeout in milliseconds
  API_TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000', 10),
  
  // Whether to include credentials in requests (for cookies/auth)
  INCLUDE_CREDENTIALS: true,
  
  // Development mode flag
  IS_DEV: import.meta.env.MODE === 'development',
};

export default env;
