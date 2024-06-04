import express from "express";
import * as academiaController from "../controllers/academiaController.js";
import { authentificateJWT } from "../middleware/auth.js";

const router = express.Router();

// Rutas para las academias
router.get("/api/academias", academiaController.getAcademias);
router.get("/api/academias/:id", academiaController.getAcademiaById);
router.post(
  "/api/academias",
  authentificateJWT,
  academiaController.createAcademia
);
router.put(
  "/api/academias/:id",
  authentificateJWT,
  academiaController.updateAcademia
);
router.delete(
  "/api/academias/:id",
  authentificateJWT,
  academiaController.deleteAcademia
);

export default router;
