import * as service from "../services/usuario.service.js";
import { NotFoundError } from "../utils/errors.js";
import { log } from "../utils/logger.js";

// Buscar todos los usuarios
export const getUsuarios = async (req, res, next) => {
    try {
        if (res.locals.user.rol === "Administrador") {
            const usuarios = await service.findAll();
            res.json(usuarios);
            log(req, `GET /usuarios ${usuarios.length} registros encontrados`);
        } else {
            next(new NotFoundError("No tiene permiso para realizar esta acción"));
        }
    } catch (error) {
        next(error);
        log(req, `Error en getUsuarios: ${error.message}`);
    }
};
