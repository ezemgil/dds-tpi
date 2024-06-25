import express from "express";
import { authentificateJWT } from "../middleware/auth.js";
import * as controller from "../controllers/cineasta.controller.js";

const router = express.Router();

router.get("/api/cineastas/buscar", controller.getCineastasByName);
router.get("/api/cineastas", controller.getCineastas);
router.get("/api/cineastas/:id", controller.getCineastaById);
router.post("/api/cineastas", authentificateJWT, controller.createCineasta);
router.put("/api/cineastas/:id", authentificateJWT, controller.updateCineasta);
router.delete(
  "/api/cineastas/:id",
  authentificateJWT,
  controller.deleteCineasta
);

export default router;
