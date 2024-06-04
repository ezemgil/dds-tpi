import express from "express";
import * as controller from "../controllers/premioController.js";
import { authentificateJWT } from "../middleware/auth.js";

const router = express.Router();

// Rutas para los premios
router.get("/api/premios", authentificateJWT, controller.getPremios);
router.get("/api/premios/:id", authentificateJWT, controller.getPremioById);
router.post("/api/premios", authentificateJWT, controller.createPremio);
router.put("/api/premios/:id", authentificateJWT, controller.updatePremio);
router.delete("/api/premios/:id", authentificateJWT, controller.deletePremio);

export default router;
