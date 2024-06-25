import express from "express";
import * as controller from "../controllers/genero.controller.js";
import { authentificateJWT } from "../middleware/auth.js";

const router = express.Router();

// Rutas para los géneros
router.get("/api/generos", controller.getGeneros);
router.get("/api/generos/:id", controller.getGeneroById);
router.post("/api/generos", authentificateJWT, controller.createGenero);
router.put("/api/generos/:id", authentificateJWT, controller.updateGenero);
router.delete("/api/generos/:id", authentificateJWT, controller.deleteGenero);

export default router;
