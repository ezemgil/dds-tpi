import * as service from "../services/pelicula.service.js";
import { NotFoundError, BadRequestError } from "../utils/errors.js";
import { log } from "../utils/logger.js";

// Obtener todas las películas
export const getPeliculas = async (req, res, next) => {
    try {
        const page = req.query.page;
        const size = req.query.size;
        const peliculas = await service.findAll(page, size);
        res.json(peliculas);
        log(req, `GET /peliculas ${peliculas.length} registros encontrados`);
    } catch (error) {
        log(req, `Error: ${error.message}`);
        next(error);
    }
};

// Obtener X películas aleatorias
export const getPeliculasAleatorias = async (req, res, next) => {
    try {
        const peliculas = await service.findRandom(req.query.cantidad);
        res.json(peliculas);
        log(req, `GET /peliculas/aleatorias?cantidad=${req.query.cantidad} ${peliculas.length} registros encontrados`);
    } catch (error) {
        log(req, `Error: ${error.message}`);
        next(error);
    }
};

// Obtener la lista de actores de una película
export const getElenco = async (req, res, next) => {
    try {
        const elenco = await service.getElenco(req.params.id);
        res.json(elenco);
        log(req, `GET /peliculas/${req.params.id}/actores`);
    } catch (error) {
        log(req, `Error: ${error.message}`);
        next(error);
    }
};

// Buscar una película por su id
export const getPeliculaById = async (req, res, next) => {
    try {
        const pelicula = await service.findById(req.params.id);
        if (pelicula) {
            res.json(pelicula);
            log(req, `GET /peliculas/${req.params.id}`);
        } else {
            next(new NotFoundError("Película no encontrada"));
        }
    } catch (error) {
        log(req, `Error: ${error.message}`);
        next(error);
    }
};

// Buscar una película por su nombre
export const getPeliculaByNombre = async (req, res, next) => {
    try {
        const peliculas = await service.findByName(req.query.nombre);
        res.json(peliculas);
        log(req, `GET /peliculas?nombre=${req.query.nombre} ${peliculas.length} registros encontrados`);
    } catch (error) {
        log(req, `Error: ${error.message}`);
        next(error);
    }
};

// Crear una nueva película
export const createPelicula = async (req, res, next) => {
    try {
        if (res.locals.user.rol === "Administrador") {
            const { generos, idiomas, ...pelicula } = req.body;
            const newPelicula = await service.create(pelicula, generos, idiomas);
            log(req, `POST /peliculas`);
            res.status(201).json(newPelicula);
        } else {
            next(new BadRequestError("No tiene permiso para realizar esta acción"));
        }
    } catch (error) {
        log(req, `Error: ${error.message}`);
        next(error);
    }
};

// Actualizar una película
export const updatePelicula = async (req, res, next) => {
    try {
        if (res.locals.user.rol === "Administrador") {
            const { generos, idiomas, ...pelicula } = req.body;
            const updatedPelicula = await service.update(req.params.id, pelicula, generos, idiomas);
            if (updatedPelicula) {
                res.json(updatedPelicula);
            } else {
                next(new NotFoundError("Película no encontrada"));
            }
        } else {
            next(new BadRequestError("No tiene permiso para realizar esta acción"));
        }
    } catch (error) {
        log(req, `Error: ${error.message}`);
        next(error);
    }
};

// Eliminar una película
export const deletePelicula = async (req, res, next) => {
    try {
        if (res.locals.user.rol === "Administrador") {
            const result = await service.remove(req.params.id);
            if (result) {
                res.status(204).send("Película eliminada");
            } else {
                next(new NotFoundError("Película no encontrada"));
            }
        } else {
            next(new BadRequestError("No tiene permiso para realizar esta acción"));
        }
    } catch (error) {
        log(req, `Error: ${error.message}`);
        next(error);
    }
};

// Agregar cineastas a una película
export const addCineastas = async (req, res, next) => {
    try {
        if (res.locals.user.rol === "Administrador") {
            const { cineastas } = req.body;
            const result = await service.addCineastas(req.params.id, cineastas);
            if (result) {
                res.status(201).send("Cineastas agregados");
            } else {
                next(new BadRequestError("No se pudieron agregar los cineastas"));
            }
        } else {
            next(new BadRequestError("No tiene permiso para realizar esta acción"));
        }
    } catch (error) {
        log(req, `Error: ${error.message}`);
        next(error);
    }
};

// Quitar un cineasta de una película
export const removeCineasta = async (req, res, next) => {
    try {
        if (res.locals.user.rol === "Administrador") {
            const result = await service.removeCineasta(req.params.id, req.params.cineasta);
            if (result) {
                res.send("Cineasta eliminado");
            } else {
                next(new NotFoundError("Cineasta no encontrado"));
            }
        } else {
            next(new BadRequestError("No tiene permiso para realizar esta acción"));
        }
    } catch (error) {
        log(req, `Error: ${error.message}`);
        next(error);
    }
};
