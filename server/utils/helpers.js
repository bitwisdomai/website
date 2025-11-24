import slugifyLib from 'slugify';

// Generate slug from string
export const generateSlug = (text) => {
  return slugifyLib(text, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g
  });
};

// Async handler wrapper to catch errors
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Error response helper
export const errorResponse = (res, statusCode, message, errors = null) => {
  const response = {
    success: false,
    message
  };

  if (errors) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};

// Success response helper
export const successResponse = (res, statusCode, message, data = null) => {
  const response = {
    success: true,
    message
  };

  if (data) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};
