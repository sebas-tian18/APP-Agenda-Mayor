// Middleware global para la captura de codigos HTTP 
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    const statusCode = err.statusCode || 500; // Usa el statusCode del error o 500 por defecto
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Error interno del servidor',
    });
};

module.exports = errorHandler;