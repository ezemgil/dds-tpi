import express from 'express';
import * as paisController from '../controllers/paisController.js';

const router = express.Router();

// Rutas para los paises
router.get('/paises', paisController.getPaises);
router.get('/paises/:id', paisController.getPaisById);
router.post('/paises', paisController.createPais);
router.put('/paises/:id', paisController.updatePais);
router.delete('/paises/:id', paisController.deletePais);

export default router;