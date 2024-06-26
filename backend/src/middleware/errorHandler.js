function errorHandler(err, req, res, next) {
  // Determina el código de estado HTTP del error, si no existe, utiliza 500
  const statusCode = err.statusCode || 500;

  // Log del error para el seguimiento interno
  console.error(err);

  // Responde al cliente con el error en formato JSON
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message: err.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}

export default errorHandler;
