import request from "supertest";
import app from "../src/app.js";
import * as controller from "../src/controllers/clasificacion.controller.js";

jest.mock("../src/controllers/clasificacion.controller.js");
jest.mock("../src/middleware/auth.js", () => {
    return {
        authentificateJWT: (req, res, next) => {
            next();
        },
    };
});

const clasificaciones = [
    { id: 1, nombre: "Clasificacion 1" },
    { id: 2, nombre: "Clasificacion 2" },
    { id: 3, nombre: "Clasificacion 3" },
    { id: 4, nombre: "Clasificacion 4" },
];

// Mock the controller functions
beforeEach(() => {
    controller.getClasificacionByNombre.mockImplementation((req, res) => {
        res.json(clasificaciones);
    });

    controller.getClasificaciones.mockImplementation((req, res) => {
        res.json(clasificaciones);
    });

    controller.getClasificacionById.mockImplementation((req, res) => {
        res.json(clasificaciones[0]);
    });

    controller.createClasificacion.mockImplementation((req, res) => {
        res.json(clasificaciones[0]);
    });

    controller.updateClasificacion.mockImplementation((req, res) => {
        res.json(clasificaciones[0]);
    });

    controller.deleteClasificacion.mockImplementation((req, res) => {
        res.json(clasificaciones[0]);
    });
});

describe("GET /api/clasificaciones/buscar - Get clasificacion by nombre", () => {
    test("Successfully get clasificacion by nombre", async () => {
        const response = await request(app).get("/api/clasificaciones/buscar");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(clasificaciones);
    });
});

describe("GET /api/clasificaciones - Get all clasificaciones", () => {
    test("Successfully get all clasificaciones", async () => {
        const response = await request(app).get("/api/clasificaciones");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(clasificaciones);
    });
});

describe("GET /api/clasificaciones/:id - Get clasificacion by ID", () => {
    test("Successfully get clasificacion by ID", async () => {
        const response = await request(app).get("/api/clasificaciones/1");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(clasificaciones[0]);
    });
});

describe("POST /api/clasificaciones - Create a clasificacion", () => {
    test("Successfully create a clasificacion", async () => {
        const response = await request(app)
            .post("/api/clasificaciones")
            .set("Authorization", "Bearer your-access-token")
            .send(clasificaciones[0]);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(clasificaciones[0]);
    });
});

describe("PUT /api/clasificaciones/:id - Update a clasificacion", () => {
    test("Successfully update a clasificacion", async () => {
        const response = await request(app)
            .put("/api/clasificaciones/1")
            .set("Authorization", "Bearer your-access-token")
            .send(clasificaciones[0]);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(clasificaciones[0]);
    });
});

describe("DELETE /api/clasificaciones/:id - Delete a clasificacion", () => {
    test("Successfully delete a clasificacion", async () => {
        const response = await request(app)
            .delete("/api/clasificaciones/1")
            .set("Authorization", "Bearer your-access-token");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(clasificaciones[0]);
    });
});
