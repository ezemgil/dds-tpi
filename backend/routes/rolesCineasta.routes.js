import express from "express";
import * as rolesCineastaController from "../controllers/rolesCineastaController.js";

const router = express.Router();

// Rutas para los roles de cineasta
router.get("/roles_cineasta", rolesCineastaController.getRolesCineasta);
router.get("/roles_cineasta/cineastas_por_rol/:id", rolesCineastaController.getCineastasPorRol);
router.get("/roles_cineasta/roles_de_cineasta/:id", rolesCineastaController.getRolesDeCineasta);
router.get("/roles_cineasta/rol_de_cineasta", rolesCineastaController.getRolDeCineasta);
router.post("/roles_cineasta", rolesCineastaController.createRolCineasta);
router.delete("/roles_cineasta", rolesCineastaController.deleteRolCineasta);

export default router;