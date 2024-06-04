import express from "express";
import * as idiomaController from "../controllers/idiomaController.js";
import { authentificateJWT } from "../middleware/auth.js";

const router = express.Router();

// Rutas para los idiomas
router.get("/api/idiomas", idiomaController.getIdiomas);
router.get("/api/idiomas/:id", idiomaController.getIdiomaById);
router.post("/api/idiomas", authentificateJWT, idiomaController.createIdioma);
router.put(
  "/api/idiomas/:id",
  authentificateJWT,
  idiomaController.updateIdioma
);
router.delete(
  "/api/idiomas/:id",
  authentificateJWT,
  idiomaController.deleteIdioma
);

export default router;
