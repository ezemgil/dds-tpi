import express from "express";
import * as usuarioController from "../controllers/usuarioController.js";
import { authentificateJWT } from "../middleware/auth.js";

const router = express.Router();

router.get("/api/usuarios", authentificateJWT, usuarioController.getUsuarios);

export default router;
