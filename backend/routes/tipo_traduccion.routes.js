import express from "express";
import * as tipo_traduccionController from "../controllers/tipo_traduccionController.js";
import { authentificateJWT } from "../middleware/auth.js";

const router = express.Router();

// Rutas para los TipoTraduccion
router.get(
  "/api/tipos_traduccion",
  authentificateJWT,
  tipo_traduccionController.getTiposTraduccion
);
router.get(
  "/api/tipos_traduccion/:id",
  authentificateJWT,
  tipo_traduccionController.getTipoTraduccionById
);
router.post(
  "/api/tipos_traduccion",
  authentificateJWT,
  tipo_traduccionController.createTipoTraduccion
);
router.put(
  "/api/tipos_traduccion/:id",
  authentificateJWT,
  tipo_traduccionController.updateTipoTraduccion
);
router.delete(
  "/api/tipos_traduccion/:id",
  authentificateJWT,
  tipo_traduccionController.deleteTipoTraduccion
);

export default router;
