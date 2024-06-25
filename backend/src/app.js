import express from "express";
import errorHandler from "./middleware/errorHandler.js";
import { authentificateJWT } from "./middleware/auth.js";
import cors from "cors";

// Relaciones de modelos
import "./models/associations.js";

// Importar rutas
import authRoutes from "./routes/auth.routes.js";
import cineastaRoutes from "./routes/cineasta.routes.js";
import clasificacionRoutes from "./routes/clasificacion.routes.js";
import generoRoutes from "./routes/genero.routes.js";
import nominacionPeliculaRoutes from "./routes/nominacionPelicula.routes.js";
import paisRoutes from "./routes/pais.routes.js";
import peliculaRoutes from "./routes/pelicula.routes.js";
import premioRoutes from "./routes/premio.routes.js";
import rolesUsuarioRoutes from "./routes/rolesUsuario.routes.js";
import usuarioRoutes from "./routes/usuario.routes.js";

// Crear aplicación express
const app = express();

// Configuración de express y middlewares
app.use(express.json());
app.use(cors());
app.use(errorHandler);
// app.use(authentificateJWT);

// Rutas
app.use(authRoutes);
app.use(cineastaRoutes);
app.use(clasificacionRoutes);
app.use(generoRoutes);
app.use(nominacionPeliculaRoutes);
app.use(paisRoutes);
app.use(peliculaRoutes);
app.use(premioRoutes);
app.use(rolesUsuarioRoutes);
app.use(usuarioRoutes);

export default app;
