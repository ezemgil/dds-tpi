import express from "express";
import sequelize from "./config/database.js";
import errorHandler from "./middleware/errorHandler.js";
import { logger } from "./utils/logger.js";

// Relaciones de modelos
import "./models/associations.js";

// Importar rutas
import authRoutes from "./routes/auth.routes.js";
import generoRoutes from "./routes/genero.routes.js";
import peliculaRoutes from "./routes/pelicula.routes.js";
import clasificacionRoutes from "./routes/clasificacion.routes.js";

// Crear aplicación express
const app = express();
const PORT = process.env.PORT || 3000;

// Configurar express para recibir JSON en el body de las peticiones
app.use(express.json());

// Rutas
app.use(authRoutes);
app.use(generoRoutes);
app.use(peliculaRoutes);
app.use(clasificacionRoutes);

// Middlewares
app.use(errorHandler);

// Iniciar el servidor
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    logger.info(`Servidor iniciado en http://localhost:${PORT}`);
  });
});
