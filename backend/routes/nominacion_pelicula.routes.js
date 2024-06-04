import express from "express";
import * as nominacion_peliculaController from "../controllers/nominacion_peliculaController.js";
import { authentificateJWT } from "../middleware/auth.js";

const router = express.Router();

// Rutas para las nominaciones de peliculas
router.get(
  "/api/nominaciones_pelicula",
  nominacion_peliculaController.getNominacionesPelicula
);
router.get(
  "/api/nominaciones_pelicula/:id_academia/:id_premio/:id_pelicula",
  nominacion_peliculaController.getNominacionPeliculaById
);
router.get(
  "/api/nominaciones_pelicula/academia/:id_academia",
  nominacion_peliculaController.getNominacionPeliculaByAcademia
);
router.get(
  "/api/nominaciones_pelicula/premio/:id_premio",
  nominacion_peliculaController.getNominacionPeliculaByPremio
);
router.get(
  "/api/nominaciones_pelicula/pelicula/:id_pelicula",
  nominacion_peliculaController.getNominacionPeliculaByPelicula
);
router.post(
  "/api/nominaciones_pelicula",
  authentificateJWT,
  nominacion_peliculaController.createNominacionPelicula
);
router.put(
  "/api/nominaciones_pelicula/:id_academia/:id_premio/:id_pelicula",
  authentificateJWT,
  nominacion_peliculaController.updateNominacion
);
router.delete(
  "/api/nominaciones_pelicula/:id_academia/:id_premio/:id_pelicula",
  authentificateJWT,
  nominacion_peliculaController.deleteNominacionPelicula
);

export default router;
