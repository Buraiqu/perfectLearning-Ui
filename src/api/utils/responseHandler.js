/**
 * Response handler utilities
 * Standardizes API response handling and error processing
 */

/**
 * Process successful API response
 * @param {Object} response - Axios response object
 * @returns {Object} Standardized response object
 */
export const handleSuccess = (response) => {
  return {
    success: true,
    data: response.data,
    status: response.status,
    headers: response.headers,
  };
};

/**
 * Process API error
 * @param {Object} error - Error object from API call
 * @returns {Object} Standardized error object
 */
export const handleError = (error) => {
  // Default error structure
  const errorResponse = {
    success: false,
    message: 'An unexpected error occurred',
    status: 500,
    data: null,
    error: error,
  };

  // If there's a response from the server
  if (error.response) {
    errorResponse.status = error.response.status;
    errorResponse.data = error.response.data;
    errorResponse.message = error.response.data?.message || getErrorMessageByStatus(error.response.status);
  } 
  // If the request was made but no response was received
  else if (error.request) {
    errorResponse.message = 'No response received from server';
    errorResponse.status = 0;
  }

  return errorResponse;
};

/**
 * Get a human-readable error message based on HTTP status code
 * @param {number} status - HTTP status code
 * @returns {string} Human-readable error message
 */
export const getErrorMessageByStatus = (status) => {
  const statusMessages = {
    400: 'Bad request. Please check your input.',
    401: 'Unauthorized. Please log in again.',
    403: 'Forbidden. You don\'t have permission to access this resource.',
    404: 'Resource not found.',
    408: 'Request timeout. Please try again.',
    409: 'Conflict with current state of the resource.',
    422: 'Validation error. Please check your input.',
    429: 'Too many requests. Please try again later.',
    500: 'Internal server error. Please try again later.',
    502: 'Bad gateway. Please try again later.',
    503: 'Service unavailable. Please try again later.',
    504: 'Gateway timeout. Please try again later.'
  };

  return statusMessages[status] || 'An unexpected error occurred';
};
