import express from "express";
import * as nominacionesCineastasController from "../controllers/nominacionesCineastaController.js";

const router = express.Router();

// Rutas para las nominaciones de cineastas
router.get("/nominaciones_cineastas", nominacionesCineastasController.getNominacionesCineasta);
router.get("/nominaciones_cineastas/:academia/:premio/:pelicula/:cineasta/:rol", nominacionesCineastasController.getNominacionCineasta);
router.post("/nominaciones_cineastas", nominacionesCineastasController.createNominacionCineasta);
router.delete("/nominaciones_cineastas/:academia/:premio/:pelicula/:cineasta/:rol", nominacionesCineastasController.removeNominacionCineasta);

export default router;