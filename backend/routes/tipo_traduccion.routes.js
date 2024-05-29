import express from "express";
import * as tipo_traduccionController from "../controllers/tipo_traduccionController.js";

const router = express.Router();

// Rutas para los TipoTraduccion
router.get("/tipos_traduccion", tipo_traduccionController.getTiposTraduccion);
router.get("/tipos_traduccion/:id", tipo_traduccionController.getTipoTraduccionById);
router.post("/tipos_traduccion", tipo_traduccionController.createTipoTraduccion);
router.put("/tipos_traduccion/:id", tipo_traduccionController.updateTipoTraduccion);
router.delete("/tipos_traduccion/:id", tipo_traduccionController.deleteTipoTraduccion);

export default router;