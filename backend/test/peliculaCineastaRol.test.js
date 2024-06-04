import request from "supertest";
import app from "../src/app.js";
import * as peliculaCineastaRolController from "../controllers/peliculaCineastaRolController.js";

jest.mock("../controllers/peliculaCineastaRolController.js");

const peliculas_cineastas_roles = [
    { id_pelicula: 1, id_cineasta: 1, id_rol: 1 },
    { id_pelicula: 2, id_cineasta: 2, id_rol: 2 },
    { id_pelicula: 3, id_cineasta: 3, id_rol: 3 },
    { id_pelicula: 4, id_cineasta: 4, id_rol: 4 },
];

// Mockear la funcion peliculaCineastaRolController.getPeliculaCineastaRoles
beforeEach(() => {
    peliculaCineastaRolController.getPeliculaCineastaRoles.mockImplementation((req, res) => {
        res.json(peliculas_cineastas_roles);
    });
});

describe("GET /peliculas_cineastas_roles - Obtener todas las relaciones entre películas, cineastas y roles", () => {
    test("Obtener todas las relaciones entre películas, cineastas y roles exitosamente", async () => {
        const response = await request(app).get("/peliculas_cineastas_roles");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(peliculas_cineastas_roles);
    });

    test("Error al obtener todas las relaciones entre películas, cineastas y roles", async () => {
        peliculaCineastaRolController.getPeliculaCineastaRoles.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/peliculas_cineastas_roles");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

// Mockear la funcion peliculaCineastaRolController.getPeliculaCineastaRolById
describe("GET /peliculas_cineastas_roles/:id_pelicula/:id_cineasta/:id_rol - Obtener relación entre película, cineasta y rol por ID", () => {
    test("Obtener relación entre película, cineasta y rol por ID exitosamente", async () => {
        peliculaCineastaRolController.getPeliculaCineastaRolById.mockImplementationOnce((req, res) => {
            res.json(peliculas_cineastas_roles[0]);
        });
        const response = await request(app).get("/peliculas_cineastas_roles/1/1/1");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(peliculas_cineastas_roles[0]);
    });
    test("Error al obtener relación entre película, cineasta y rol por ID", async () => {
        peliculaCineastaRolController.getPeliculaCineastaRolById.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/peliculas_cineastas_roles/1/1/1");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
    test("Relación entre película, cineasta y rol no encontrada", async () => {
        peliculaCineastaRolController.getPeliculaCineastaRolById.mockImplementationOnce((req, res) => {
            res.status(404).send("Relación entre película, cineasta y rol no encontrada");
        });
    });
});

// Mockear la funcion peliculaCineastaRolController.createPeliculaCineastaRol
describe("POST /peliculas_cineastas_roles - Crear nueva relación entre película, cineasta y rol", () => {
    test("Crear nueva relación entre película, cineasta y rol exitosamente", async () => {
        peliculaCineastaRolController.createPeliculaCineastaRol.mockImplementationOnce((req, res) => {
            res.json(peliculas_cineastas_roles[0]);
        });
        const response = await request(app).post("/peliculas_cineastas_roles").send(peliculas_cineastas_roles[0]);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(peliculas_cineastas_roles[0]);
    });
    test("Error al crear nueva relación entre película, cineasta y rol", async () => {
        peliculaCineastaRolController.createPeliculaCineastaRol.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).post("/peliculas_cineastas_roles").send(peliculas_cineastas_roles[0]);
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

// Mockear la funcion peliculaCineastaRolController.updatePeliculaCineastaRol
describe("PUT /peliculas_cineastas_roles/:id_pelicula/:id_cineasta/:id_rol - Actualizar relación entre película, cineasta y rol", () => {
    test("Actualizar relación entre película, cineasta y rol exitosamente", async () => {
        peliculaCineastaRolController.updatePeliculaCineastaRol.mockImplementationOnce((req, res) => {
            res.json(peliculas_cineastas_roles[0]);
        });
        const response = await request(app).put("/peliculas_cineastas_roles/1/1/1").send(peliculas_cineastas_roles[0]);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(peliculas_cineastas_roles[0]);
    });
    test("Error al actualizar relación entre película, cineasta y rol", async () => {
        peliculaCineastaRolController.updatePeliculaCineastaRol.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).put("/peliculas_cineastas_roles/1/1/1").send(peliculas_cineastas_roles[0]);
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

// Mockear la funcion peliculaCineastaRolController.deletePeliculaCineastaRol
describe("DELETE /peliculas_cineastas_roles/:id_pelicula/:id_cineasta/:id_rol - Eliminar relación entre película, cineasta y rol", () => {
    test("Eliminar relación entre película, cineasta y rol exitosamente", async () => {
        peliculaCineastaRolController.deletePeliculaCineastaRol.mockImplementationOnce((req, res) => {
            res.json(peliculas_cineastas_roles[0]);
        });
        const response = await request(app).delete("/peliculas_cineastas_roles/1/1/1");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(peliculas_cineastas_roles[0]);
    });
    test("Error al eliminar relación entre película, cineasta y rol", async () => {
        peliculaCineastaRolController.deletePeliculaCineastaRol.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).delete("/peliculas_cineastas_roles/1/1/1");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});
