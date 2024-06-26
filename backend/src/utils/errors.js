// Error no encontrado: 404
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
        this.statusCode = 404;
    }
}

// Error de validación: 400
class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = "BadRequestError";
        this.statusCode = 400;
    }
}

// Error de autenticación: 401
class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.name = "UnauthorizedError";
        this.statusCode = 401;
    }
}

// Error de autorización: 403
class ForbiddenError extends Error {
    constructor(message) {
        super(message);
        this.name = "ForbiddenError";
        this.statusCode = 403;
    }
}

// Código 422 Unprocessable Entity (errores de validación de la base de datos)
class DatabaseValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "DatabaseValidationError";
        this.statusCode = 422;
    }
}

export { NotFoundError, BadRequestError, UnauthorizedError, ForbiddenError, DatabaseValidationError };
