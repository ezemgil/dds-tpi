import express from "express";
import * as controller from "../controllers/premio.controller.js";
import { authentificateJWT } from "../middleware/auth.js";

const router = express.Router();

router.get("/api/premios/buscar", controller.getPremioByName);
router.get("/api/premios", controller.getPremios);
router.get("/api/premios/:id", controller.getPremioById);
router.post("/api/premios", authentificateJWT, controller.createPremio);
router.put("/api/premios/:id", authentificateJWT, controller.updatePremio);
router.delete("/api/premios/:id", authentificateJWT, controller.deletePremio);

export default router;
