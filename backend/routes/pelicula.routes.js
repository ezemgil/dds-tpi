import express from "express";
import * as peliculaController from "../controllers/peliculaController.js";
import { authentificateJWT } from "../middleware/auth.js";

const router = express.Router();

// Rutas para las películas
router.get("/api/peliculas", peliculaController.getPeliculas);
router.get("/api/peliculas/:id", peliculaController.getPeliculaById);
router.post(
  "/api/peliculas",
  authentificateJWT,
  peliculaController.createPelicula
);
router.put(
  "/api/peliculas/:id",
  authentificateJWT,
  peliculaController.updatePelicula
);
router.delete(
  "/api/peliculas/:id",
  authentificateJWT,
  peliculaController.deletePelicula
);

export default router;
