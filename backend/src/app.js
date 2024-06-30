import cors from "cors";
import express from "express";
import errorHandler from "./middleware/errorHandler.js";

// Relaciones de modelos
import "./models/associations.js";

// Importar rutas
import authRoutes from "./routes/auth.routes.js";
import cineastaRoutes from "./routes/cineasta.routes.js";
import clasificacionRoutes from "./routes/clasificacion.routes.js";
import generoRoutes from "./routes/genero.routes.js";
import idiomaRoutes from "./routes/idioma.routes.js";
import nominacionPeliculaRoutes from "./routes/nominacionPelicula.routes.js";
import paisRoutes from "./routes/pais.routes.js";
import peliculaRoutes from "./routes/pelicula.routes.js";
import premioRoutes from "./routes/premio.routes.js";
import rolesUsuarioRoutes from "./routes/rolesUsuario.routes.js";
import tipoRolRoutes from "./routes/tipoRol.routes.js";
import usuarioRoutes from "./routes/usuario.routes.js";


// Crear aplicación express
const app = express();
app.use(cors());
app.use(express.json());


// Rutas
app.use(authRoutes);
app.use(cineastaRoutes);
app.use(clasificacionRoutes);
app.use(generoRoutes);
app.use(idiomaRoutes);
app.use(nominacionPeliculaRoutes);
app.use(paisRoutes);
app.use(peliculaRoutes);
app.use(premioRoutes);
app.use(rolesUsuarioRoutes);
app.use(usuarioRoutes);
app.use(tipoRolRoutes);

app.get("/api/status", (req, res) => {
  res.json({ status: "API en funcionamiento" });
});

// Ruta no encontrada
app.use((req, res, next) => {
  res.status((404).json({ error: "Not Found" }));
});

// Configuración de express y middlewares
app.use(errorHandler);

export default app;
