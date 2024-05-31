import express from 'express';
import * as academiaController from '../controllers/academiaController.js';

const router = express.Router();

// Rutas para las academias
router.get("/academias", academiaController.getAcademias);
router.get("/academias/:id", academiaController.getAcademiaById);
router.post("/academias", academiaController.createAcademia);
router.put("/academias/:id", academiaController.updateAcademia);
router.delete("/academias/:id", academiaController.deleteAcademia);

export default router;