import express from "express";
import errorHandler from "../middleware/errorHandler.js";
import { authentificateJWT } from "../middleware/auth.js";
import cors from "cors";

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
import cineastaRoutes from "../routes/cineasta.routes.js";
import nominacionesCineastasRoutes from "../routes/nominacionesCineastas.routes.js";
import paisRoutes from "../routes/pais.routes.js";
import rolesCineastaRoutes from "../routes/rolesCineasta.routes.js";
import tipoRolRoutes from "../routes/tipoRol.routes.js";
import peliculaCineastaRolRoutes from "../routes/peliculaCineastaRol.routes.js";
import idiomaPeliculaRoutes from "../routes/idiomaPelicula.routes.js";
import roles_usuarioRoutes from "../routes/rolesUsuario.routes.js";
import usuarioRoutes from "../routes/usuario.routes.js";

// Crear aplicación express
const app = express();

// Configurar express para recibir JSON en el body de las peticiones
app.use(express.json());
app.use(cors());

// Rutas
app.use(authRoutes);
app.use(generoRoutes);
app.use(peliculaRoutes);
app.use(clasificacionRoutes);
app.use(idiomaRoutes);
app.use(tipoTraduccionRoutes);
app.use(academiaRoutes);
app.use(nominacion_peliculaRoutes);
app.use(premioRoutes);
app.use(paisRoutes);
app.use(cineastaRoutes);
app.use(tipoRolRoutes);
app.use(rolesCineastaRoutes);
app.use(nominacionesCineastasRoutes);
app.use(peliculaCineastaRolRoutes);
app.use(idiomaPeliculaRoutes);
app.use(roles_usuarioRoutes);
app.use(usuarioRoutes);

// Middlewares
app.use(errorHandler);
app.use(authentificateJWT);

export default app;
