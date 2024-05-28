import express from "express";
import * as peliculaController from "../controllers/peliculaController.js";

const router = express.Router();

// Rutas para las películas
router.get("/peliculas", peliculaController.getPeliculas);
router.get("/peliculas/:id", peliculaController.getPeliculaById);
router.post("/peliculas", peliculaController.createPelicula);
router.put("/peliculas/:id", peliculaController.updatePelicula);
router.delete("/peliculas/:id", peliculaController.deletePelicula);

export default router;
