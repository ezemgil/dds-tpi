import express from "express";
import * as clasificacionController from "../controllers/clasificacionController.js";

const router = express.Router();

// Rutas para las clasificaciones
router.get("/clasificaciones", clasificacionController.getClasificaciones);
router.get(
  "/clasificaciones/:id",
  clasificacionController.getClasificacionById
);
router.post("/clasificaciones", clasificacionController.createClasificacion);
router.put("/clasificaciones/:id", clasificacionController.updateClasificacion);
router.delete(
  "/clasificaciones/:id",
  clasificacionController.deleteClasificacion
);

export default router;
