import express from 'express';
import * as tipoRolController from '../controllers/tipoRolController.js';

const router = express.Router();

// Rutas para los tipos de rol
router.post('/tipos_rol', tipoRolController.createTipoRol); // Create
router.get('/tipos_rol', tipoRolController.getTiposRol); // Read
router.get('/tipos_rol/:id', tipoRolController.getTipoRolById); // Read
router.put('/tipos_rol/:id', tipoRolController.updateTipoRol);  // Update
router.delete('/tipos_rol/:id', tipoRolController.deleteTipoRol); // Delete

export default router;