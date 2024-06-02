import * as idiomaPeliculaController from "../controllers/idiomaPeliculaController.js";
import express from "express";

const router = express.Router();

// Rutas para los idiomas de peliculas
router.get("/idiomas_pelicula", idiomaPeliculaController.getIdiomasPelicula);
router.get("/idiomas_pelicula/:id_pelicula/:id_idioma/:id_tipo_traduccion", idiomaPeliculaController.getIdiomaPeliculaById);
router.post("/idiomas_pelicula", idiomaPeliculaController.createIdiomaPelicula);
router.put("/idiomas_pelicula/:id_pelicula/:id_idioma/:id_tipo_traduccion", idiomaPeliculaController.updateIdiomaPelicula);
router.delete("/idiomas_pelicula/:id_pelicula/:id_idioma/:id_tipo_traduccion", idiomaPeliculaController.deleteIdiomaPelicula);

export default router;