import request from "supertest";
import app from "../src/app.js";
import * as premioController from "../controllers/premioController.js";

jest.mock("../controllers/premioController.js");

const premios = [
    { id: 1, nombre: "Premio 1" },
    { id: 2, nombre: "Premio 2" },
    { id: 3, nombre: "Premio 3" },
    { id: 4, nombre: "Premio 4" },
]


// Mockear la funcion premioController.getPremios
beforeEach(() => {
    premioController.getPremios.mockImplementation((req, res) => {
        res.json(premios);
    });
});

describe("GET /premios - Obtener todos los premios", () => {
    test("Obtener todos los premios exitosamente", async () => {
        const response = await request(app).get("/premios");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(premios);
    });

    test("Error al obtener todos los premios", async () => {
        premioController.getPremios.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/premios");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

// Mockear la funcion premioController.getPremioById
describe("GET /premios/:id - Obtener premio por ID", () => {
    test("Obtener premio por ID exitosamente", async () => {
        premioController.getPremioById.mockImplementationOnce((req, res) => {
            res.json(premios[0]);
        });
        const response = await request(app).get("/premios/1");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(premios[0]);
    });
    test("Error al obtener premio por ID", async () => {
        premioController.getPremioById.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/premios/1");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
    test("Premio no encontrado", async () => {
        premioController.getPremioById.mockImplementationOnce((req, res) => {
            res.status(404).send("Premio no encontrado");
        });
        const response = await request(app).get("/premios/1");
        expect(response.status).toBe(404);
        expect(response.text).toBe("Premio no encontrado");
    });
});

// Mockear la funcion premioController.createPremio
describe("POST /premios - Crear premio", () => {
    test("Crear premio exitosamente", async () => {
        premioController.createPremio.mockImplementationOnce((req, res) => {
            res.json(premios[0]);
        });
        const response = await request(app).post("/premios").send(premios[0]);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(premios[0]);
    });
    test("Error al crear premio", async () => {
        premioController.createPremio.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).post("/premios").send(premios[0]);
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

// Mockear la funcion premioController.updatePremio
describe("PUT /premios/:id - Actualizar premio", () => {
    test("Actualizar premio exitosamente", async () => {
        premioController.updatePremio.mockImplementationOnce((req, res) => {
            res.json(premios[0]);
        });
        const response = await request(app).put("/premios/1").send(premios[0]);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(premios[0]);
    });
    test("Error al actualizar premio", async () => {
        premioController.updatePremio.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).put("/premios/1").send(premios[0]);
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
    test("Premio no encontrado", async () => {
        premioController.updatePremio.mockImplementationOnce((req, res) => {
            res.status(404).send("Premio no encontrado");
        });
        const response = await request(app).put("/premios/1").send(premios[0]);
        expect(response.status).toBe(404);
        expect(response.text).toBe("Premio no encontrado");
    });
});

// Mockear la funcion premioController.deletePremio
describe("DELETE /premios/:id - Eliminar premio", () => {
    test("Eliminar premio exitosamente", async () => {
        premioController.deletePremio.mockImplementationOnce((req, res) => {
            res.json(premios[0]);
        });
        const response = await request(app).delete("/premios/1");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(premios[0]);
    });
    test("Error al eliminar premio", async () => {
        premioController.deletePremio.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).delete("/premios/1");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
    test("Premio no encontrado", async () => {
        premioController.deletePremio.mockImplementationOnce((req, res) => {
            res.status(404).send("Premio no encontrado");
        });
        const response = await request(app).delete("/premios/1");
        expect(response.status).toBe(404);
        expect(response.text).toBe("Premio no encontrado");
    });
});