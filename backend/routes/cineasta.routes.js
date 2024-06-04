import express from "express";
import * as cineastaController from "../controllers/cineastaController.js";
import { authentificateJWT } from "../middleware/auth.js";

const router = express.Router();

// Rutas para los cineastas
router.get("/api/cineastas", cineastaController.getCineastas);
router.get("/api/cineastas/:id", cineastaController.getCineastaById);
router.post(
  "/api/cineastas",
  authentificateJWT,
  cineastaController.createCineasta
);
router.put(
  "/api/cineastas/:id",
  authentificateJWT,
  cineastaController.updateCineasta
);
router.delete(
  "/api/cineastas/:id",
  authentificateJWT,
  cineastaController.deleteCineasta
);

export default router;
