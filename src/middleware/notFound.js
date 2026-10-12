/**
 * Fallback handler for unmatched API routes.
 * Returns a standardized JSON 404 response without leaking internal server paths.
 */
export const notFoundHandler = (req, res, _next) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};
