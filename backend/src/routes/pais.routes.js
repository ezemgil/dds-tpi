import express from "express";
import * as controller from "../controllers/pais.controller.js";
import { authentificateJWT } from "../middleware/auth.js";

const router = express.Router();

router.get("/api/paises/buscar", controller.getPaisByNombre);
router.get("/api/paises", controller.getPaises);
router.get("/api/paises/:id", controller.getPaisById);
router.post("/api/paises", authentificateJWT, controller.createPais);
router.put("/api/paises/:id", authentificateJWT, controller.updatePais);
router.delete("/api/paises/:id", authentificateJWT, controller.deletePais);

export default router;
