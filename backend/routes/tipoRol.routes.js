import express from "express";
import * as tipoRolController from "../controllers/tipoRolController.js";
import { authentificateJWT } from "../middleware/auth.js";

const router = express.Router();

// Rutas para los tipos de rol
router.post(
  "/api/tipos_rol",
  authentificateJWT,
  tipoRolController.createTipoRol
);
router.get("/api/tipos_rol", authentificateJWT, tipoRolController.getTiposRol);
router.get(
  "/api/tipos_rol/:id",
  authentificateJWT,
  tipoRolController.getTipoRolById
);
router.put(
  "/api/tipos_rol/:id",
  authentificateJWT,
  tipoRolController.updateTipoRol
);
router.delete(
  "/api/tipos_rol/:id",
  authentificateJWT,
  tipoRolController.deleteTipoRol
);

export default router;
