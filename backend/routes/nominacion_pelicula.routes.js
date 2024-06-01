import * as nominacion_peliculaController from "../controllers/nominacion_peliculaController.js";
import express from "express";

const router = express.Router();

// Rutas para las nominaciones de peliculas
router.get(
  "/nominaciones_pelicula",
  nominacion_peliculaController.getNominacionesPelicula
);
router.get(
  "/nominaciones_pelicula/:id_academia/:id_premio/:id_pelicula",
  nominacion_peliculaController.getNominacionPeliculaById
);
router.get(
  "/nominaciones_pelicula/academia/:id_academia",
  nominacion_peliculaController.getNominacionPeliculaByAcademia
);
router.get(
  "/nominaciones_pelicula/premio/:id_premio",
  nominacion_peliculaController.getNominacionPeliculaByPremio
);
router.get(
  "/nominaciones_pelicula/pelicula/:id_pelicula",
  nominacion_peliculaController.getNominacionPeliculaByPelicula
);
router.post(
  "/nominaciones_pelicula",
  nominacion_peliculaController.createNominacionPelicula
);
router.put(
  "/nominaciones_pelicula/:id_academia/:id_premio/:id_pelicula",
  nominacion_peliculaController.updateNominacion
);
router.delete(
  "/nominaciones_pelicula/:id_academia/:id_premio/:id_pelicula",
  nominacion_peliculaController.deleteNominacionPelicula
);

export default router;
