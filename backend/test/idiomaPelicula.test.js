import request from "supertest";
import app from "../src/app.js";
import * as idiomaPeliculaController from "../controllers/idiomaPeliculaController.js";

jest.mock("../controllers/idiomaPeliculaController.js");

const idiomas_pelicula = [
    { id_pelicula: 1, id_idioma: 1, id_tipo_traduccion: 1 },
    { id_pelicula: 2, id_idioma: 2, id_tipo_traduccion: 2 },
    { id_pelicula: 3, id_idioma: 3, id_tipo_traduccion: 3 },
    { id_pelicula: 4, id_idioma: 4, id_tipo_traduccion: 4 },
];

// Mockear la funcion idiomaPeliculaController.getIdiomasPelicula
beforeEach(() => {
    idiomaPeliculaController.getIdiomasPelicula.mockImplementation((req, res) => {
        res.json(idiomas_pelicula);
    });
});

describe("GET /idiomas_pelicula - Obtener todas las relaciones entre películas e idiomas", () => {
    test("Obtener todas las relaciones entre películas e idiomas exitosamente", async () => {
        const response = await request(app).get("/idiomas_pelicula");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(idiomas_pelicula);
    });

    test("Error al obtener todas las relaciones entre películas e idiomas", async () => {
        idiomaPeliculaController.getIdiomasPelicula.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/idiomas_pelicula");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});


// Mockear la funcion idiomaPeliculaController.getIdiomaPeliculaById
describe("GET /idiomas_pelicula/:id_pelicula/:id_idioma - Obtener relación entre película e idioma por ID", () => {
    test("Obtener relación entre película e idioma por ID exitosamente", async () => {
        idiomaPeliculaController.getIdiomaPeliculaById.mockImplementationOnce((req, res) => {
            res.json(idiomas_pelicula[0]);
        });
        const response = await request(app).get("/idiomas_pelicula/1/1/1");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(idiomas_pelicula[0]);
    });
    test("Error al obtener relación entre película e idioma por ID", async () => {
        idiomaPeliculaController.getIdiomaPeliculaById.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/idiomas_pelicula/1/1/1");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
    test("Relación entre película e idioma no encontrada", async () => {
        idiomaPeliculaController.getIdiomaPeliculaById.mockImplementationOnce((req, res) => {
            res.status(404).send("Relación entre película e idioma no encontrada");
        });
    });
});

// Mockear la funcion idiomaPeliculaController.createIdiomaPelicula
describe("POST /idiomas_pelicula - Crear nueva relación entre película e idioma", () => {
    test("Crear nueva relación entre película e idioma exitosamente", async () => {
        idiomaPeliculaController.createIdiomaPelicula.mockImplementationOnce((req, res) => {
            res.json(idiomas_pelicula[0]);
        });
        const response = await request(app).post("/idiomas_pelicula").send(idiomas_pelicula[0]);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(idiomas_pelicula[0]);
    });
    test("Error al crear nueva relación entre película e idioma", async () => {
        idiomaPeliculaController.createIdiomaPelicula.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).post("/idiomas_pelicula").send(idiomas_pelicula[0]);
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

// Mockear la funcion idiomaPeliculaController.updateIdiomaPelicula
describe("PUT /idiomas_pelicula/:id_pelicula/:id_idioma - Actualizar relación entre película e idioma", () => {
    test("Actualizar relación entre película e idioma exitosamente", async () => {
        idiomaPeliculaController.updateIdiomaPelicula.mockImplementationOnce((req, res) => {
            res.json(idiomas_pelicula[0]);
        });
        const response = await request(app).put("/idiomas_pelicula/1/1/1").send(idiomas_pelicula[0]);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(idiomas_pelicula[0]);
    });
    test("Error al actualizar relación entre película e idioma", async () => {
        idiomaPeliculaController.updateIdiomaPelicula.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).put("/idiomas_pelicula/1/1/1").send(idiomas_pelicula[0]);
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
    test("Relación entre película e idioma no encontrada", async () => {
        idiomaPeliculaController.updateIdiomaPelicula.mockImplementationOnce((req, res) => {
            res.status(404).send("Relación entre película e idioma no encontrada");
        });
        const response = await request(app).put("/idiomas_pelicula/1/1/1").send(idiomas_pelicula[0]);
        expect(response.status).toBe(404);
        expect(response.text).toBe("Relación entre película e idioma no encontrada");
    });
});

// Mockear la funcion idiomaPeliculaController.deleteIdiomaPelicula
describe("DELETE /idiomas_pelicula/:id_pelicula/:id_idioma - Eliminar relación entre película e idioma", () => {
    test("Eliminar relación entre película e idioma exitosamente", async () => {
        idiomaPeliculaController.deleteIdiomaPelicula.mockImplementationOnce((req, res) => {
            res.json(idiomas_pelicula[0]);
        });
        const response = await request(app).delete("/idiomas_pelicula/1/1/1");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(idiomas_pelicula[0]);
    });
    test("Error al eliminar relación entre película e idioma", async () => {
        idiomaPeliculaController.deleteIdiomaPelicula.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).delete("/idiomas_pelicula/1/1/1");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
    test("Relación entre película e idioma no encontrada", async () => {
        idiomaPeliculaController.deleteIdiomaPelicula.mockImplementationOnce((req, res) => {
            res.status(404).send("Relación entre película e idioma no encontrada");
        });
        const response = await request(app).delete("/idiomas_pelicula/1/1/1");
        expect(response.status).toBe(404);
        expect(response.text).toBe("Relación entre película e idioma no encontrada");
    });
});

