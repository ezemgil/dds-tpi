import express from "express";
import * as rolesUsuarioController from "../controllers/roles_usuarioController.js";
import { authentificateJWT } from "../middleware/auth.js";

const router = express.Router();

// Rutas para los roles de usuario
router.get("/roles", authentificateJWT, rolesUsuarioController.getRoles);
router.get(
  "/roles/buscar",
  authentificateJWT,
  rolesUsuarioController.getRolByName
);
router.post("/roles", authentificateJWT, rolesUsuarioController.createRol);
router.put("/roles/:id", authentificateJWT, rolesUsuarioController.updateRol);
router.delete(
  "/roles/:id",
  authentificateJWT,
  rolesUsuarioController.deleteRol
);

export default router;
