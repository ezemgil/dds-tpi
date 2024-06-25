import express from "express";
import * as controller from "../controllers/pelicula.controller.js";
import { authentificateJWT } from "../middleware/auth.js";

const router = express.Router();

// Rutas para las películas
router.get("/api/peliculas", controller.getPeliculas);
router.get("/api/peliculas/:id", controller.getPeliculaById);
router.post("/api/peliculas", authentificateJWT, controller.createPelicula);
router.put("/api/peliculas/:id", authentificateJWT, controller.updatePelicula);
router.delete(
  "/api/peliculas/:id",
  authentificateJWT,
  controller.deletePelicula
);

export default router;
