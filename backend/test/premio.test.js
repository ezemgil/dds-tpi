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

describe("GET /api/generos - Get all genres", () => {
    test("Successfully get all genres", async () => {
        const response = await request(app).get("/api/generos");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(generos);
    });

    test("Error while getting all genres", async () => {
        generoController.getGeneros.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/api/generos");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

describe("GET /api/generos/:id - Get genre by ID", () => {
    test("Successfully get genre by ID", async () => {
        generoController.getGeneroById.mockImplementationOnce((req, res) => {
            res.json(generos[0]);
        });
        const response = await request(app).get("/api/generos/1");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(generos[0]);
    });

    test("Error while getting genre by ID", async () => {
        generoController.getGeneroById.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/api/generos/1");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });

    test("Genre not found", async () => {
        generoController.getGeneroById.mockImplementationOnce((req, res) => {
            res.status(404).send("Genre not found");
        });
        const response = await request(app).get("/api/generos/1");
        expect(response.status).toBe(404);
        expect(response.text).toBe("Genre not found");
    });
});

describe("POST /api/generos - Create a genre", () => {
    test("Successfully create a genre", async () => {
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

    test("Error while creating a genre", async () => {
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

describe("PUT /api/generos/:id - Update a genre", () => {
    test("Successfully update a genre", async () => {
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

    test("Error while updating a genre", async () => {
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

    test("Genre not found", async () => {
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

describe("DELETE /api/generos/:id - Delete a genre", () => {
    test("Successfully delete a genre", async () => {
        generoController.deleteGenero.mockImplementationOnce((req, res) => {
            res.json(generos[0]);
        });
        const response = await request(app).delete("/api/generos/1").set("Authorization", "Bearer your-access-token");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(generos[0]);
    });

    test("Error while deleting a genre", async () => {
        generoController.deleteGenero.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).delete("/api/generos/1").set("Authorization", "Bearer your-access-token");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });

    test("Genre not found", async () => {
        generoController.deleteGenero.mockImplementationOnce((req, res) => {
            res.status(404).send("Genre not found");
        });
        const response = await request(app).delete("/api/generos/1").set("Authorization", "Bearer your-access-token");
        expect(response.status).toBe(404);
        expect(response.text).toBe("Genre not found");
    });
});
