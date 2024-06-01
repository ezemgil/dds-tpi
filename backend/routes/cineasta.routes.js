import express from "express";
import * as cineastaController from "../controllers/cineastaController.js";

const router = express.Router();

// Rutas para los cineastas
router.get("/cineastas", cineastaController.getCineastas);
router.get("/cineastas/:id", cineastaController.getCineastaById);
router.post("/cineastas", cineastaController.createCineasta);
router.put("/cineastas/:id", cineastaController.updateCineasta);
router.delete("/cineastas/:id", cineastaController.deleteCineasta);

export default router;