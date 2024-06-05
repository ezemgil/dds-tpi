import * as peliculaCineastaRolController from "../controllers/peliculaCineastaRolController.js";
import express from "express";
import { authentificateJWT } from "../middleware/auth.js";

const router = express.Router();

// Rutas para las relaciones entre películas, cineastas y roles
router.get(
  "/api/peliculas_cineastas_roles",
  peliculaCineastaRolController.getPeliculaCineastaRoles
);
router.get(
  "/api/peliculas_cineastas_roles/:id",
  peliculaCineastaRolController.getPeliculaCineastaRolById
);
router.post(
  "/api/peliculas_cineastas_roles",
  authentificateJWT,
  peliculaCineastaRolController.createPeliculaCineastaRol
);
router.put(
  "/api/peliculas_cineastas_roles/:id",
  authentificateJWT,
  peliculaCineastaRolController.updatePeliculaCineastaRol
);
router.delete(
  "/api/peliculas_cineastas_roles/:id",
  authentificateJWT,
  peliculaCineastaRolController.deletePeliculaCineastaRol
);

export default router;
