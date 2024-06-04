import express from "express";
import * as rolesUsuarioController from "../controllers/roles_usuarioController.js";
import { authentificateJWT } from "../middleware/auth.js";

const router = express.Router();

// Rutas para los roles de usuario
router.get(
  "/api/roles_usuario",
  authentificateJWT,
  rolesUsuarioController.getRoles
);
router.get(
  "/api/roles_usuario/buscar",
  authentificateJWT,
  rolesUsuarioController.getRolByName
);
router.post(
  "/api/roles_usuario",
  authentificateJWT,
  rolesUsuarioController.createRol
);
router.put(
  "/api/roles_usuario/:id",
  authentificateJWT,
  rolesUsuarioController.updateRol
);
router.delete(
  "/api/roles_usuario/:id",
  authentificateJWT,
  rolesUsuarioController.deleteRol
);

export default router;
