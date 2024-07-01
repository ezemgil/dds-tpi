import express from "express";
import * as controller from "../controllers/tipoRol.controller.js";
import { authentificateJWT } from "../middleware/auth.js";

const router = express.Router();

router.get("/api/tipos_rol/buscar", controller.getTipoRolByName);
router.get("/api/tipos_rol", controller.getTiposRol);
router.get("/api/tipos_rol/:id", controller.getTipoRolById);
router.post("/api/tipos_rol", authentificateJWT, controller.createTipoRol);
router.put("/api/tipos_rol/:id", authentificateJWT, controller.updateTipoRol);
router.delete("/api/tipos_rol/:id", authentificateJWT, controller.deleteTipoRol);

export default router;
