import request from "supertest";
import app from "../src/app.js";
import * as generoController from "../src/controllers/genero.controller.js";

jest.mock("../src/controllers/genero.controller.js");
jest.mock("../src/middleware/auth.js", () => {
    return {
        authentificateJWT: (req, res, next) => {
            next();
        },
    };
});

const generos = [
    { id: 1, nombre: "Acción" },
    { id: 2, nombre: "Comedia" },
    { id: 3, nombre: "Drama" },
    { id: 4, nombre: "Aventura" },
];

// Mock the generoController.getGeneros function
beforeEach(() => {
    generoController.getGeneros.mockImplementation((req, res) => {
        res.json(generos);
    });
});

describe("GET /api/generos - Obtener todos los generos", () => {
    test("Se obtuvieron todos los generos exitosamente", async () => {
        const response = await request(app).get("/api/generos");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(generos);
    });

    test("Error al obtener todos los generos", async () => {
        generoController.getGeneros.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/api/generos");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

describe("GET /api/generos/:id - Obtener genero por ID", () => {
    test("Se obtuvo un genero por ID exitosamente", async () => {
        generoController.getGeneroById.mockImplementationOnce((req, res) => {
            res.json(generos[0]);
        });
        const response = await request(app).get("/api/generos/1");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(generos[0]);
    });

    test("Error al obtener gener por ID", async () => {
        generoController.getGeneroById.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/api/generos/1");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });

    test("Genero no encontrado", async () => {
        generoController.getGeneroById.mockImplementationOnce((req, res) => {
            res.status(404).send("Genre not found");
        });
        const response = await request(app).get("/api/generos/1");
        expect(response.status).toBe(404);
        expect(response.text).toBe("Genre not found");
    });
});

describe("POST /api/generos - Crear un genero", () => {
    test("Se creo un genero exitosamente", async () => {
        generoController.createGenero.mockImplementationOnce((req, res) => {
            res.json(generos[0]);
        });
        const response = await request(app)
            .post("/api/generos")
            .set("Authorization", "Bearer your-access-token")
            .send(generos[0]);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(generos[0]);
    });

    test("Error al crear un genero", async () => {
        generoController.createGenero.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app)
            .post("/api/generos")
            .set("Authorization", "Bearer your-access-token")
            .send(generos[0]);
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

describe("PUT /api/generos/:id - Actualizar un genero", () => {
    test("Se actualizo un genero exitosamente", async () => {
        generoController.updateGenero.mockImplementationOnce((req, res) => {
            res.json(generos[0]);
        });
        const response = await request(app)
            .put("/api/generos/1")
            .set("Authorization", "Bearer your-access-token")
            .send(generos[0]);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(generos[0]);
    });

    test("Error al actualizar un genero", async () => {
        generoController.updateGenero.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app)
            .put("/api/generos/1")
            .set("Authorization", "Bearer your-access-token")
            .send(generos[0]);
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });

    test("Genero no encontrado", async () => {
        generoController.updateGenero.mockImplementationOnce((req, res) => {
            res.status(404).send("Genre not found");
        });
        const response = await request(app)
            .put("/api/generos/1")
            .set("Authorization", "Bearer your-access-token")
            .send(generos[0]);
        expect(response.status).toBe(404);
        expect(response.text).toBe("Genre not found");
    });
});

describe("DELETE /api/generos/:id - Eliminar un genero", () => {
    test("Se elimino un genero exitosamente", async () => {
        generoController.deleteGenero.mockImplementationOnce((req, res) => {
            res.json(generos[0]);
        });
        const response = await request(app).delete("/api/generos/1").set("Authorization", "Bearer your-access-token");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(generos[0]);
    });

    test("Error al eliminar un genero", async () => {
        generoController.deleteGenero.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).delete("/api/generos/1").set("Authorization", "Bearer your-access-token");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });

    test("Genero no encontrado", async () => {
        generoController.deleteGenero.mockImplementationOnce((req, res) => {
            res.status(404).send("Genre not found");
        });
        const response = await request(app).delete("/api/generos/1").set("Authorization", "Bearer your-access-token");
        expect(response.status).toBe(404);
        expect(response.text).toBe("Genre not found");
    });
});
