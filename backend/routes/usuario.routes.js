import express from "express";
import * as usuarioController from "../controllers/usuarioController.js";

const router = express.Router();

router.get("/api/usuarios", usuarioController.getUsuarios);

export default router;
