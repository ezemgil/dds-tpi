import express from "express";
import sequelize from "./config/database.js";
import errorHandler from "./middleware/errorHandler.js";

// Relaciones de modelos
import "./models/associations.js";

// Importar rutas
import generoRoutes from "./routes/genero.routes.js";
import peliculaRoutes from "./routes/pelicula.routes.js";
import clasificacionRoutes from "./routes/clasificacion.routes.js";

// Crear aplicación express
const app = express();
const PORT = process.env.PORT;

// Configurar express para recibir JSON en el body de las peticiones
app.use(express.json());

// Middlewares
app.use(errorHandler);

// Rutas
app.use(generoRoutes);
app.use(peliculaRoutes);
app.use(clasificacionRoutes);

// Iniciar el servidor
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
  });
});
