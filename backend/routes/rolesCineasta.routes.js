import express from "express";
import * as rolesCineastaController from "../controllers/rolesCineastaController.js";
import { authentificateJWT } from "../middleware/auth.js";

const router = express.Router();

// Rutas para los roles de cineasta
router.get("/api/roles_cineasta", rolesCineastaController.getRolesCineasta);
router.get(
  "/api/roles_cineasta/cineastas_por_rol/:id",
  rolesCineastaController.getCineastasPorRol
);
router.get(
  "/api/roles_cineasta/roles_de_cineasta/:id",
  rolesCineastaController.getRolesDeCineasta
);

// TODO
router.get(
  "/api/roles_cineasta/:id_cineasta/:id_rol",
  rolesCineastaController.getRolDeCineasta
);

router.post(
  "/api/roles_cineasta",
  authentificateJWT,
  rolesCineastaController.createRolCineasta
);
router.delete(
  "/api/roles_cineasta/:id_cineasta/:id_rol",
  authentificateJWT,
  rolesCineastaController.deleteRolCineasta
);

export default router;
