/**
 * API Module Index
 * Central export point for all API-related functionality
 */

// Export configured axios instance
export { default as api } from './config/axios';

// Export all services
export * from './services';

// Export authentication utilities
export * from './utils/auth';

// Export response handling utilities
export * from './utils/responseHandler';

// Export environment configuration
export { default as apiConfig } from './config/env';
