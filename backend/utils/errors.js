const createError = require('http-errors');
// Errores personalizados
module.exports = {
    BadRequestError: (message = 'Bad request') => createError(400, message),
    UnauthorizedError: (message = 'Unauthorized') => createError(401, message),
    ForbiddenError: (message = 'Forbidden') => createError(403, message),
    NotFoundError: (message = 'Resource not found') => createError(404, message),
    ConflictError: (message = 'Conflict') => createError(409, message),
    UnprocessableEntityError: (message = 'Unprocessable entity') => createError(422, message),
    TooManyRequestsError: (message = 'Too many requests') => createError(429, message),
    InternalServerError: (message = 'Internal server error') => createError(500, message),
    ServiceUnavailableError: (message = 'Service unavailable') => createError(503, message),
};