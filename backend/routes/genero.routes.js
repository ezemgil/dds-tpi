import express from "express";
import * as generoController from "../controllers/generoController.js";

const router = express.Router();

// Rutas para los géneros
router.get("/generos", generoController.getGeneros);
router.get("/generos/:id", generoController.getGeneroById);
router.post("/generos", generoController.createGenero);
router.put("/generos/:id", generoController.updateGenero);
router.delete("/generos/:id", generoController.deleteGenero);

export default router;
