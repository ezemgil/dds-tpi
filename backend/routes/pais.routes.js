import express from 'express';
import * as paisController from '../controllers/paisController.js';

const router = express.Router();

// Rutas para los paises
router.post('/paises', paisController.createPais); // Create
router.get('/paises', paisController.getPaises); // Read
router.get('/paises/:id', paisController.getPaisById); // Read
router.put('/paises/:id', paisController.updatePais);  // Update
router.delete('/paises/:id', paisController.deletePais); // Delete

export default router;