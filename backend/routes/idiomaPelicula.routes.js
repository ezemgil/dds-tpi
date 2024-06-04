import express from "express";
import * as idiomaPeliculaController from "../controllers/idiomaPeliculaController.js";
import { authentificateJWT } from "../middleware/auth.js";

const router = express.Router();

// Rutas para los idiomas de peliculas
router.get(
  "/api/idiomas_pelicula",
  idiomaPeliculaController.getIdiomasPelicula
);
router.get(
  "/api/idiomas_pelicula/:id_pelicula/:id_idioma/:id_tipo_traduccion",
  idiomaPeliculaController.getIdiomaPeliculaById
);
router.post(
  "/api/idiomas_pelicula",
  authentificateJWT,
  idiomaPeliculaController.createIdiomaPelicula
);
router.put(
  "/api/idiomas_pelicula/:id_pelicula/:id_idioma/:id_tipo_traduccion",
  authentificateJWT,
  idiomaPeliculaController.updateIdiomaPelicula
);
router.delete(
  "/api/idiomas_pelicula/:id_pelicula/:id_idioma/:id_tipo_traduccion",
  authentificateJWT,
  idiomaPeliculaController.deleteIdiomaPelicula
);

export default router;
