import express from "express";
import sequelize from "./config/database.js";
import errorHandler from "./middleware/errorHandler.js";

// Importar rutas

import "./models/associations.js";
import cineasta from "./routes/cineasta.routes.js";
import generoRoutes from "./routes/genero.routes.js";
import nominacionesCineastasRoutes from "./routes/nominacionesCineastas.routes.js";
import paisRoutes from "./routes/pais.routes.js";
import rolesCineasta from "./routes/rolesCineasta.routes.js";
import tipoRolRoutes from "./routes/tipoRol.routes.js";

// Crear aplicación express
const app = express();
const PORT = process.env.PORT;

// Configurar express para recibir JSON en el body de las peticiones
app.use(express.json());

// Middlewares
app.use(errorHandler);

// Rutas
app.use(generoRoutes);
app.use(paisRoutes);
app.use(cineasta);
app.use(tipoRolRoutes);
app.use(rolesCineasta);
app.use(nominacionesCineastasRoutes);

// Iniciar el servidor
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
  });
});
