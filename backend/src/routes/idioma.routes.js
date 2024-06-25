import express from "express";
import * as controller from "../controllers/idioma.controller.js";
import { authentificateJWT } from "../middleware/auth.js";

const router = express.Router();

// Rutas para los idiomas
router.get("/api/idiomas", controller.getIdiomas);
router.get("/api/idiomas/:id", controller.getIdiomaById);
router.post("/api/idiomas", authentificateJWT, controller.createIdioma);
router.put("/api/idiomas/:id", authentificateJWT, controller.updateIdioma);
router.delete("/api/idiomas/:id", authentificateJWT, controller.deleteIdioma);

export default router;
