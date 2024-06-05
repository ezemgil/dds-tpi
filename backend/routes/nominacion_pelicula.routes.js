import * as nominacion_peliculaController from "../controllers/nominacion_peliculaController.js";
import express from "express";

const router = express.Router();

// Rutas para las nominaciones de peliculas
router.get("/nominaciones_pelicula",nominacion_peliculaController.getNominacionesPelicula);
router.get("/nominaciones_pelicula/:id",nominacion_peliculaController.getNominacionPeliculaById);
router.post("/nominaciones_pelicula",nominacion_peliculaController.createNominacionPelicula);
router.put("/nominaciones_pelicula/:id",nominacion_peliculaController.updateNominacion);
router.delete("/nominaciones_pelicula/:id",nominacion_peliculaController.deleteNominacionPelicula);

export default router;
