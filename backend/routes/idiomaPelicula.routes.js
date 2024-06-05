import * as idiomaPeliculaController from "../controllers/idiomaPeliculaController.js";
import express from "express";

const router = express.Router();

// Rutas para los idiomas de peliculas
router.get("/idiomas_pelicula", idiomaPeliculaController.getIdiomasPelicula);
router.get("/idiomas_pelicula/:id", idiomaPeliculaController.getIdiomaPeliculaById);
router.post("/idiomas_pelicula", idiomaPeliculaController.createIdiomaPelicula);
router.put("/idiomas_pelicula/:id", idiomaPeliculaController.updateIdiomaPelicula);
router.delete("/idiomas_pelicula/:id", idiomaPeliculaController.deleteIdiomaPelicula);

export default router;