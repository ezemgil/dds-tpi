import express from "express";
import * as paisController from "../controllers/paisController.js";
import { authentificateJWT } from "../middleware/auth.js";

const router = express.Router();

// Rutas para los paises
router.post("/api/paises", paisController.createPais);
router.get("/api/paises", paisController.getPaises);
router.get("/api/paises/:id", authentificateJWT, paisController.getPaisById);
router.put("/api/paises/:id", authentificateJWT, paisController.updatePais);
router.delete("/api/paises/:id", authentificateJWT, paisController.deletePais);

export default router;
