import * as peliculaCineastaRolController from '../controllers/peliculaCineastaRolController.js';
import express from 'express';


const router = express.Router();


// Rutas para las relaciones entre películas, cineastas y roles
router.get(
    '/peliculas_cineastas_roles',
    peliculaCineastaRolController.getPeliculaCineastaRoles
);
router.get(
    '/peliculas_cineastas_roles/:id_pelicula/:id_cineasta/:id_rol',
    peliculaCineastaRolController.getPeliculaCineastaRolById
);
router.post(
    '/peliculas_cineastas_roles',
    peliculaCineastaRolController.createPeliculaCineastaRol
);
router.put(
    '/peliculas_cineastas_roles/:id_pelicula/:id_cineasta/:id_rol',
    peliculaCineastaRolController.updatePeliculaCineastaRol
);
router.delete(
    '/peliculas_cineastas_roles/:id_pelicula/:id_cineasta/:id_rol',
    peliculaCineastaRolController.deletePeliculaCineastaRol
);


export default router;