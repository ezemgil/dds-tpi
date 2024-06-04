import request from "supertest";
import app from "../src/app.js";
import * as tipo_traduccionController from "../controllers/tipo_traduccionController.js";

jest.mock("../controllers/tipo_traduccionController.js");

const tipos_traduccion = [
    { id: 1, nombre: "Subtitulado" },
    { id: 2, nombre: "Doblado" },
    { id: 3, nombre: "Doblado con sincronizacion labial" },
    { id: 4, nombre: "Voice-over" },
];


// Mockear la funcion tipoTraduccionController.getTipoTraducciones
beforeEach(() => {
    tipo_traduccionController.getTiposTraduccion.mockImplementation((req, res) => {
        res.json(tipos_traduccion);
    });
});

describe("GET /tipos_traduccion - Obtener todos los tipos de traducciones", () => {
    test("Obtener todos los tipos de traduccion exitosamente", async () => {
        const response = await request(app).get("/tipos_traduccion");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(tipos_traduccion);
    });

    test("Error al obtener todos los tipos de traduccion", async () => {
        tipo_traduccionController.getTiposTraduccion.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/tipos_traduccion");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

// Mockear la funcion tipoTraduccionController.getTipoTraduccionById
describe("GET /tipos_traduccion/:id - Obtener tipo de traducción por ID", () => {
    test("Obtener tipo de traducción por ID exitosamente", async () => {
        tipo_traduccionController.getTipoTraduccionById.mockImplementationOnce((req, res) => {
            res.json(tipos_traduccion[0]);
        });
        const response = await request(app).get("/tipos_traduccion/1");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(tipos_traduccion[0]);
    });
    test("Error al obtener tipo de traducción por ID", async () => {
        tipo_traduccionController.getTipoTraduccionById.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/tipos_traduccion/1");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
    test("Tipo de traducción no encontrado", async () => {
        tipo_traduccionController.getTipoTraduccionById.mockImplementationOnce((req, res) => {
            res.status(404).send("Tipo de traducción no encontrado");
        });
        const response = await request(app).get("/tipos_traduccion/1");
        expect(response.status).toBe(404);
        expect(response.text).toBe("Tipo de traducción no encontrado");
    });
});

// Mockear la funcion tipoTraduccionController.createTipoTraduccion
describe("POST /tipos_traduccion - Crear un tipo de traducción", () => {
    test("Crear tipo de traducción exitosamente", async () => {
        tipo_traduccionController.createTipoTraduccion.mockImplementationOnce((req, res) => {
            res.json(tipos_traduccion[0]);
        });
        const response = await request(app).post("/tipos_traduccion").send(tipos_traduccion[0]);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(tipos_traduccion[0]);
    });
    test("Error al crear tipo de traducción", async () => {
        tipo_traduccionController.createTipoTraduccion.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).post("/tipos_traduccion").send(tipos_traduccion[0]);
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

// Mockear la funcion tipoTraduccionController.updateTipoTraduccion
describe("PUT /tipos_traduccion/:id - Actualizar un tipo de traducción", () => {
    test("Actualizar tipo de traducción exitosamente", async () => {
        tipo_traduccionController.updateTipoTraduccion.mockImplementationOnce((req, res) => {
            res.json(tipos_traduccion[0]);
        });
        const response = await request(app).put("/tipos_traduccion/1").send(tipos_traduccion[0]);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(tipos_traduccion[0]);
    });
    test("Error al actualizar tipo de traducción", async () => {
        tipo_traduccionController.updateTipoTraduccion.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).put("/tipos_traduccion/1").send(tipos_traduccion[0]);
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
    test("Tipo de traducción no encontrado", async () => {
        tipo_traduccionController.updateTipoTraduccion.mockImplementationOnce((req, res) => {
            res.status(404).send("Tipo de traducción no encontrado");
        });
        const response = await request(app).put("/tipos_traduccion/1").send(tipos_traduccion[0]);
        expect(response.status).toBe(404);
        expect(response.text).toBe("Tipo de traducción no encontrado");
    });
});

// Mockear la funcion tipoTraduccionController.deleteTipoTraduccion
describe("DELETE /tipos_traduccion/:id - Eliminar un tipo de traducción", () => {
    test("Eliminar tipo de traducción exitosamente", async () => {
        tipo_traduccionController.deleteTipoTraduccion.mockImplementationOnce((req, res) => {
            res.json(tipos_traduccion[0]);
        });
        const response = await request(app).delete("/tipos_traduccion/1");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(tipos_traduccion[0]);
    });
    test("Error al eliminar tipo de traducción", async () => {
        tipo_traduccionController.deleteTipoTraduccion.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).delete("/tipos_traduccion/1");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
    test("Tipo de traducción no encontrado", async () => {
        tipo_traduccionController.deleteTipoTraduccion.mockImplementationOnce((req, res) => {
            res.status(404).send("Tipo de traducción no encontrado");
        });
        const response = await request(app).delete("/tipos_traduccion/1");
        expect(response.status).toBe(404);
        expect(response.text).toBe("Tipo de traducción no encontrado");
    });
});
