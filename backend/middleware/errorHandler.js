import { logger } from "../utils/logger.js";

// Error Handler
const errorHandler = (err, req, res, next) => {
  logger.error(`Error Handler: ${err.message}`);
  res.status(err.statusCode || 500).json({
    message: err.message || "Error interno del servidor",
    details: err.details || "No se ha proporcionado información adicional",
  });
};

export default errorHandler;
