import express from "express";
import * as controller from "../controllers/clasificacion.controller.js";
import { authentificateJWT } from "../middleware/auth.js";

const router = express.Router();

// Rutas para las clasificaciones
router.get("/api/clasificaciones", controller.getClasificaciones);
router.get("/api/clasificaciones/:id", controller.getClasificacionById);
router.post(
  "/api/clasificaciones",
  authentificateJWT,
  controller.createClasificacion
);
router.put(
  "/api/clasificaciones/:id",
  authentificateJWT,
  controller.updateClasificacion
);
router.delete(
  "/api/clasificaciones/:id",
  authentificateJWT,
  controller.deleteClasificacion
);

export default router;
