import express from "express";
import * as rolesUsuarioController from "../controllers/roles_usuarioController.js";

const router = express.Router();

// Rutas para los roles de usuario
router.get("/roles", rolesUsuarioController.getRoles);
router.get("/roles/buscar", rolesUsuarioController.getRolByName);
router.post("/roles", rolesUsuarioController.createRol);
router.put("/roles/:id", rolesUsuarioController.updateRol);
router.delete("/roles/:id", rolesUsuarioController.deleteRol);

export default router;
