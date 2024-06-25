import express from "express";
import * as controller from "../controllers/usuario.controller.js";
import { authentificateJWT } from "../middleware/auth.js";

const router = express.Router();

router.get("/api/usuarios", authentificateJWT, controller.getUsuarios);

export default router;
