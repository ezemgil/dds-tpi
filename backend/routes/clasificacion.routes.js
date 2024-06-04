import express from "express";
import * as clasificacionController from "../controllers/clasificacionController.js";
import { authentificateJWT } from "../middleware/auth.js";

const router = express.Router();

// Rutas para las clasificaciones
router.get("/api/clasificaciones", clasificacionController.getClasificaciones);
router.get(
  "/api/clasificaciones/:id",
  clasificacionController.getClasificacionById
);
router.post(
  "/api/clasificaciones",
  authentificateJWT,
  clasificacionController.createClasificacion
);
router.put(
  "/api/clasificaciones/:id",
  authentificateJWT,
  clasificacionController.updateClasificacion
);
router.delete(
  "/api/clasificaciones/:id",
  authentificateJWT,
  clasificacionController.deleteClasificacion
);

export default router;
