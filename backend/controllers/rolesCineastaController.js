import * as rolesCineastaService from '../services/rolesCineastaService.js';
import { NotFoundError } from '../utils/errors.js';

// Buscar todos los roles de cineasta
export const getRolesCineasta = async (req, res, next) => {
  try {
    const rolesCineasta = await rolesCineastaService.getRolesCineasta();
    res.json(rolesCineasta);
  } catch (error) {
    next(error);
  }
};

// Buscar los roles de un cineasta especifico
export const getRolesDeCineasta = async (req, res, next) => {
  try {
    const rolesCineasta = await rolesCineastaService.getRolesPorCineasta(req.params.id);
    if (rolesCineasta) {
      res.json(rolesCineasta);
    } else {
      next(new NotFoundError('Rol de cineasta no encontrado'));
    }
  } catch (error) {
    next(error);
  }
};

// Buscar los cineastas con un rol específico
export const getCineastasPorRol = async (req, res, next) => {
  try {
    const cineastasDelRol = await rolesCineastaService.getCineastasPorRol(req.params.id);
    if (cineastasDelRol) {
      res.json(cineastasDelRol);
    }
  }catch (error){
    next(error);
  }
};

export const getRolDeCineasta = async (req, res, next) => {
  try {
    const rolCineasta = await rolesCineastaService.getRolDeCineasta(req.params.id_cineasta, req.params.id_rol);
    if (rolCineasta) {
      res.json(rolCineasta);
    } else {
      next(new NotFoundError('Rol de cineasta no encontrado'));
    }
  } catch (error) {
    next(error);
  }
}

// Crear un nuevo rol de cineasta
export const createRolCineasta = async (req, res, next) => {
  try {
    const rolCineasta = await rolesCineastaService.createRolCineasta(req.body);
    res.status(201).json(rolCineasta);
  } catch (error) {
    next(error);
  }
};

// Eliminar un rol de cineasta
export const deleteRolCineasta = async (req, res, next) => {
    try{
        const result = await rolesCineastaService.deleteRolCineasta(req.params.id_cineasta, req.params.id_rol);
        if (result) {
            res.send('Rol de cineasta eliminado');
        } else {
            next(new NotFoundError('Rol de cineasta no encontrado'));
        }
    } catch (error) {
        next(error);
    }
};


