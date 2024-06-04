import express from "express";
import * as nominacionesCineastasController from "../controllers/nominacionesCineastaController.js";
import { authentificateJWT } from "../middleware/auth.js";

const router = express.Router();

// Rutas para las nominaciones de cineastas
router.get(
  "/api/nominaciones_cineastas",
  nominacionesCineastasController.getNominacionesCineasta
);
router.get(
  "/api/nominaciones_cineastas/:academia/:premio/:pelicula/:cineasta/:rol",
  nominacionesCineastasController.getNominacionCineasta
);
router.post(
  "/api/nominaciones_cineastas",
  authentificateJWT,
  nominacionesCineastasController.createNominacionCineasta
);
router.put(
  "/api/nominaciones_cineastas/:academia/:premio/:pelicula/:cineasta/:rol",
  authentificateJWT,
  nominacionesCineastasController.updateNominacionCineasta
);
router.delete(
  "/api/nominaciones_cineastas/:academia/:premio/:pelicula/:cineasta/:rol",
  authentificateJWT,
  nominacionesCineastasController.removeNominacionCineasta
);

export default router;
