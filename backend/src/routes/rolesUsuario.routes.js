import express from "express";
import * as controller from "../controllers/rolesUsuario.controller.js";
import { authentificateJWT } from "../middleware/auth.js";

const router = express.Router();

router.get("/api/roles_usuario", authentificateJWT, controller.getRoles);
router.get("/api/roles_usuario/buscar", authentificateJWT, controller.getRolByName);
router.post("/api/roles_usuario", authentificateJWT, controller.createRol);
router.put("/api/roles_usuario/:id", authentificateJWT, controller.updateRol);
router.delete("/api/roles_usuario/:id", authentificateJWT, controller.deleteRol);

export default router;
