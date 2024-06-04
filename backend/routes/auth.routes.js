import express from "express";
import * as authController from "../controllers/authController.js";
const router = express.Router();

// Rutas para la seguridad
router.post("/api/login", authController.login);
router.post("/api/logout", authController.logout);
router.post("/api/token", authController.refresh);

export default router;
