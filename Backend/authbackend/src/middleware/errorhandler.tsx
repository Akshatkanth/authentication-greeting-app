// Backend/authbackend/src/middleware/errorHandler.js
export default function errorHandler(err, req, res, next) {
  console.error(err.stack);
  
  // Check if this is a client-side connection error
  if (err.message === 'API connection is currently disabled') {
    return res.status(503).json({
      error: 'Service temporarily unavailable',
      message: 'The connection to the API is currently disabled by the client'
    });
  }
  
  // Handle other errors
  res.status(err.statusCode || 500).json({
    error: err.name || 'Internal Server Error',
    message: err.message || 'Something went wrong'
  });
}
