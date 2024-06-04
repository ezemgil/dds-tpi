import express from "express";
import * as generoController from "../controllers/generoController.js";
import { authentificateJWT } from "../middleware/auth.js";

const router = express.Router();

// Rutas para los géneros
router.get("/api/generos", generoController.getGeneros);
router.get("/api/generos/:id", generoController.getGeneroById);
router.post("/api/generos", authentificateJWT, generoController.createGenero);
router.put(
  "/api/generos/:id",
  authentificateJWT,
  generoController.updateGenero
);
router.delete(
  "/api/generos/:id",
  authentificateJWT,
  generoController.deleteGenero
);

export default router;
