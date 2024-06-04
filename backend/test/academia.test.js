import request from "supertest";
import app from "../src/app.js";
import * as academiaController from "../controllers/academiaController.js";

jest.mock("../controllers/academiaController.js");

const academias = [
    { id: 1, nombre: "Academia 1" },
    { id: 2, nombre: "Academia 2" },
    { id: 3, nombre: "Academia 3" },
    { id: 4, nombre: "Academia 4" },
];


// Mockear la funcion academiaController.getAcademias
beforeEach(() => {
    academiaController.getAcademias.mockImplementation((req, res) => {
        res.json(academias);
    });
});

describe("GET /Academias - Obtener todas las academias", () => {
    test("Obtener todas las academias exitosamente", async () => {
        const response = await request(app).get("/academias");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(academias);
    });

    test("Error al obtener todas las academias", async () => {
        academiaController.getAcademias.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/academias");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

describe("GET /academias/:id - Obtener academia por ID", () => {
    test("Obtener academia por ID exitosamente", async () => {
        academiaController.getAcademiaById.mockImplementationOnce((req, res) => {
            res.json(academias[0]);
        });
        const response = await request(app).get("/academias/1");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(academias[0]);
    });
    test("Error al obtener academia por ID", async () => {
        academiaController.getAcademiaById.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/academias/1");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
    test("Academia no encontrada", async () => {
        academiaController.getAcademiaById.mockImplementationOnce((req, res) => {
            res.status(404).send("Academia no encontrada");
        });
        const response = await request(app).get("/academias/1");
        expect(response.status).toBe(404);
        expect(response.text).toBe("Academia no encontrada");
    });
});

describe("POST /academias - Crear nueva academia", () => {
    test("Crear academia exitosamente", async () => {
        academiaController.createAcademia.mockImplementationOnce((req, res) => {
            res.json(academias[0]);
        });
        const response = await request(app).post("/academias").send(academias[0]);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(academias[0]);
    });
    test("Error al crear academia", async () => {
        academiaController.createAcademia.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).post("/academias").send(academias[0]);
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

describe("PUT /academias/:id - Actualizar academia", () => {
    test("Actualizar academia exitosamente", async () => {
        academiaController.updateAcademia.mockImplementationOnce((req, res) => {
            res.json(academias[0]);
        });
        const response = await request(app).put("/academias/1").send(academias[0]);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(academias[0]);
    });
    test("Error al actualizar academia", async () => {
        academiaController.updateAcademia.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).put("/academias/1").send(academias[0]);
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });

    test("Academia no encontrada", async () => {
        academiaController.updateAcademia.mockImplementationOnce((req, res) => {
            res.status(404).send("Academia no encontrada");
        });
        const response = await request(app).put("/academias/1").send(academias[0]);
        expect(response.status).toBe(404);
        expect(response.text).toBe("Academia no encontrada");
    });
});

describe("DELETE /academias/:id - Eliminar academia", () => {
    test("Eliminar academia exitosamente", async () => {
        academiaController.deleteAcademia.mockImplementationOnce((req, res) => {
            res.json(academias[0]);
        });
        const response = await request(app).delete("/academias/1");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(academias[0]);
    });
    test("Error al eliminar academia", async () => {
        academiaController.deleteAcademia.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).delete("/academias/1");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
    test("Academia no encontrada", async () => {
        academiaController.deleteAcademia.mockImplementationOnce((req, res) => {
            res.status(404).send("Academia no encontrada");
        });
        const response = await request(app).delete("/academias/1");
        expect(response.status).toBe(404);
        expect(response.text).toBe("Academia no encontrada");
    });
});