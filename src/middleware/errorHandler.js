/**
 * Centralized error-handling middleware.
 * Conceals internal stack traces and server internals when running in production.
 */
export const errorHandler = (err, _req, res, _next) => {
  const statusCode = err.statusCode || err.status || 500;
  const isProduction = process.env.NODE_ENV === 'production';

  const response = {
    error: statusCode === 500 ? 'Internal Server Error' : (err.name || 'Error'),
    message: isProduction && statusCode === 500
      ? 'An unexpected error occurred.'
      : (err.message || 'Unknown error'),
  };

  // Stack traces are strictly excluded in production
  if (!isProduction && err.stack) {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};
