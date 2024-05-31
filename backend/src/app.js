import express from "express";
import errorHandler from "../middleware/errorHandler.js";
import { logger } from "../utils/logger.js";

// Relaciones de modelos
import "../models/associations.js";

// Importar rutas
import authRoutes from "../routes/auth.routes.js";
import generoRoutes from "../routes/genero.routes.js";
import peliculaRoutes from "../routes/pelicula.routes.js";
import clasificacionRoutes from "../routes/clasificacion.routes.js";
import idiomaRoutes from "../routes/idioma.routes.js";
import tipoTraduccionRoutes from "../routes/tipo_traduccion.routes.js";
import academiaRoutes from "../routes/academia.routes.js";
import nominacion_peliculaRoutes from "../routes/nominacion_pelicula.routes.js";
import premioRoutes from "../routes/premio.routes.js";

// Crear aplicación express
const app = express();

// Configurar express para recibir JSON en el body de las peticiones
app.use(express.json());

// Rutas
app.get("/", (req, res) => {
  logger.info(`GET / | ${req.headers["user-agent"]}`);
  res.send("Estado de la API: OK");
});
app.use(authRoutes);
app.use(generoRoutes);
app.use(peliculaRoutes);
app.use(clasificacionRoutes);
app.use(idiomaRoutes);
app.use(tipoTraduccionRoutes);
app.use(academiaRoutes);
app.use(nominacion_peliculaRoutes);
app.use(premioRoutes);

// Middlewares
app.use(errorHandler);

export default app;
