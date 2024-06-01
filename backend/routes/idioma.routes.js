import express from "express";
import * as idiomaController from "../controllers/idiomaController.js";

const router = express.Router();

// Rutas para los idiomas
router.get("/idiomas", idiomaController.getIdiomas);
router.get("/idiomas/:id", idiomaController.getIdiomaById);
router.post("/idiomas", idiomaController.createIdioma);
router.put("/idiomas/:id", idiomaController.updateIdioma);
router.delete("/idiomas/:id", idiomaController.deleteIdioma);

export default router;
 