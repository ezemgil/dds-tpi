import express from "express";
import * as controller from "../controllers/nominacionPelicula.controller.js";
import { authentificateJWT } from "../middleware/auth.js";

const router = express.Router();

router.get("/api/nominaciones_pelicula", controller.getNominacionesPelicula);
router.get("/api/nominaciones_pelicula/pelicula/:id", controller.getNominacionesByPelicula);
router.get("/api/nominaciones_pelicula/:id", controller.getNominacionPeliculaById);
router.post("/api/nominaciones_pelicula", authentificateJWT, controller.createNominacionPelicula);
router.put("/api/nominaciones_pelicula/:id", authentificateJWT, controller.updateNominacion);
router.delete("/api/nominaciones_pelicula/:id", authentificateJWT, controller.deleteNominacionPelicula);

export default router;
