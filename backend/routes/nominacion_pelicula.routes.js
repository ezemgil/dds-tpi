import * as nominacion_pelicula from "../controllers/nominacion_pelicula.controller.js";
import express from "express";

const router = express.Router();

// Rutas para las nominaciones de peliculas
router.get("/nominaciones_pelicula", nominacion_pelicula.getNominacionesPelicula);
router.get("/nominaciones_pelicula/:id_academia/:id_premio/:id_pelicula/:fecha_nominacion", nominacion_pelicula.getNominacionPeliculaById);
router.get("/nominaciones_pelicula/academia/:id_academia", nominacion_pelicula.getNominacionPeliculaByAcademia);
router.get("/nominaciones_pelicula/premio/:id_premio", nominacion_pelicula.getNominacionPeliculaByPremio);
router.get("/nominaciones_pelicula/pelicula/:id_pelicula", nominacion_pelicula.getNominacionPeliculaByPelicula);
router.get("/nominaciones_pelicula/fecha/:fecha_nominacion", nominacion_pelicula.getNominacionPeliculaByFecha);
router.post("/nominaciones_pelicula", nominacion_pelicula.createNominacionPelicula);
router.put("/nominaciones_pelicula/:id_academia/:id_premio/:id_pelicula/:fecha_nominacion", nominacion_pelicula.updateNominacionPelicula);
router.delete("/nominaciones_pelicula/:id_academia/:id_premio/:id_pelicula/:fecha_nominacion", nominacion_pelicula.deleteNominacionPelicula);

export default router;