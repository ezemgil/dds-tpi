import express from "express";
import errorHandler from "../middleware/errorHandler.js";

// Relaciones de modelos
import "../models/associations.js";

// Importar rutas
import cineasta from "../routes/cineasta.routes.js";
import generoRoutes from "../routes/genero.routes.js";
import nominacionesCineastasRoutes from "../routes/nominacionesCineastas.routes.js";
import paisRoutes from "../routes/pais.routes.js";
import rolesCineasta from "../routes/rolesCineasta.routes.js";
import tipoRolRoutes from "../routes/tipoRol.routes.js";

// Crear aplicación express
const app = express();

// Configurar express para recibir JSON en el body de las peticiones
app.use(express.json());

// Rutas
app.get("/", (req, res) => {
  res.send("Estado de la API: OK");
});
app.use(generoRoutes);
app.use(paisRoutes);
app.use(cineasta);
app.use(tipoRolRoutes);
app.use(rolesCineasta);
app.use(nominacionesCineastasRoutes);

// Middlewares
app.use(errorHandler);

export default app;
