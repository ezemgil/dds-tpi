import express from  "express";
import * as controller from "../controllers/premioController.js";

const router = express.Router();

// Rutas para los premios
router.get("/premios", controller.getPremios);
router.get("/premios/:id", controller.getPremioById);
router.post("/premios", controller.createPremio);
router.put("/premios/:id", controller.updatePremio);
router.delete("/premios/:id", controller.deletePremio);

export default router;