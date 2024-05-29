import express from "express";
import * as seguridadController from "../controllers/seguridadController.js";
const router = express.Router();

// Rutas para la seguridad
router.post("/login", seguridadController.login);
router.post("/logout", seguridadController.logout);
router.post("/token", seguridadController.token);

export default router;
