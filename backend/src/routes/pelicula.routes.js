import express from "express";
import * as controller from "../controllers/pelicula.controller.js";
import { authentificateJWT } from "../middleware/auth.js";

const router = express.Router();

router.get("/api/peliculas/buscar", controller.getPeliculaByNombre);
router.get("/api/peliculas/random", controller.getPeliculasAleatorias);
router.get("/api/peliculas/:id/elenco", controller.getElenco);
router.get("/api/peliculas", controller.getPeliculas);
router.get("/api/peliculas/:id", controller.getPeliculaById);

// Rutas protegidas
router.post("/api/peliculas", authentificateJWT, controller.createPelicula);
router.post("/api/peliculas/:id/cineastas", authentificateJWT, controller.addCineastas);
router.put("/api/peliculas/:id", authentificateJWT, controller.updatePelicula);
router.put("/api/peliculas/:id/cineastas", authentificateJWT, controller.updateElenco);
router.delete("/api/peliculas/:id/cineastas/:cineasta", authentificateJWT, controller.removeCineasta);
router.delete("/api/peliculas/:id", authentificateJWT, controller.deletePelicula);

export default router;
