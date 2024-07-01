import request from "supertest";
import app from "../src/app.js";
import * as controller from "../src/controllers/cineasta.controller.js";

jest.mock("../src/controllers/cineasta.controller.js");
jest.mock("../src/middleware/auth.js", () => {
    return {
        authentificateJWT: (req, res, next) => {
            next();
        },
    };
});

describe("GET /api/cineastas/buscar - Get cineastas by name", () => {
    test("Successfully get cineastas by name", async () => {
        controller.getCineastasByName.mockImplementationOnce((req, res) => {
            res.json([{ id: 1, nombre: "Cineasta 1" }]);
        });
        const response = await request(app).get("/api/cineastas/buscar?nombre=Cineasta");
        expect(response.status).toBe(200);
        expect(response.body).toEqual([{ id: 1, nombre: "Cineasta 1" }]);
    });

    test("Error while getting cineastas by name", async () => {
        controller.getCineastasByName.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/api/cineastas/buscar?nombre=Cineasta");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

describe("GET /api/cineastas/:id/peliculas - Get peliculas by cineasta ID", () => {
    test("Successfully get peliculas by cineasta ID", async () => {
        controller.getPeliculasByCineasta.mockImplementationOnce((req, res) => {
            res.json([{ id: 1, titulo: "Pelicula 1" }]);
        });
        const response = await request(app).get("/api/cineastas/1/peliculas");
        expect(response.status).toBe(200);
        expect(response.body).toEqual([{ id: 1, titulo: "Pelicula 1" }]);
    });

    test("Error while getting peliculas by cineasta ID", async () => {
        controller.getPeliculasByCineasta.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/api/cineastas/1/peliculas");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

describe("GET /api/cineastas/random - Get random cineastas", () => {
    test("Successfully get random cineastas", async () => {
        const cineastas = [
            { id: 1, nombre: "Cineasta 1" },
            { id: 2, nombre: "Cineasta 2" },
        ];
        controller.getCineastasAleatorios.mockImplementationOnce((req, res) => {
            res.json(cineastas);
        });
        const response = await request(app).get("/api/cineastas/random");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(cineastas);
    });

    test("Error while getting random cineastas", async () => {
        controller.getCineastasAleatorios.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/api/cineastas/random");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

describe("GET /api/cineastas - Get all cineastas", () => {
    test("Successfully get all cineastas", async () => {
        const cineastas = [
            { id: 1, nombre: "Cineasta 1" },
            { id: 2, nombre: "Cineasta 2" },
        ];
        controller.getCineastas.mockImplementationOnce((req, res) => {
            res.json(cineastas);
        });
        const response = await request(app).get("/api/cineastas");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(cineastas);
    });

    test("Error while getting all cineastas", async () => {
        controller.getCineastas.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/api/cineastas");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

describe("GET /api/cineastas/:id - Get cineasta by ID", () => {
    test("Successfully get cineasta by ID", async () => {
        controller.getCineastaById.mockImplementationOnce((req, res) => {
            res.json({ id: 1, nombre: "Cineasta 1" });
        });
        const response = await request(app).get("/api/cineastas/1");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 1, nombre: "Cineasta 1" });
    });

    test("Error while getting cineasta by ID", async () => {
        controller.getCineastaById.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/api/cineastas/1");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });

    test("Cineasta not found", async () => {
        controller.getCineastaById.mockImplementationOnce((req, res) => {
            res.status(404).send("Cineasta not found");
        });
        const response = await request(app).get("/api/cineastas/1");
        expect(response.status).toBe(404);
        expect(response.text).toBe("Cineasta not found");
    });
});

describe("POST /api/cineastas - Create a cineasta", () => {
    test("Successfully create a cineasta", async () => {
        controller.createCineasta.mockImplementationOnce((req, res) => {
            res.json({ id: 1, nombre: "Cineasta 1" });
        });
        const response = await request(app)
            .post("/api/cineastas")
            .set("Authorization", "Bearer your-access-token")
            .send({ nombre: "Cineasta 1" });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 1, nombre: "Cineasta 1" });
    });

    test("Error while creating a cineasta", async () => {
        controller.createCineasta.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app)
            .post("/api/cineastas")
            .set("Authorization", "Bearer your-access-token")
            .send({ nombre: "Cineasta 1" });
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

describe("PUT /api/cineastas/:id - Update a cineasta", () => {
    test("Successfully update a cineasta", async () => {
        controller.updateCineasta.mockImplementationOnce((req, res) => {
            res.json({ id: 1, nombre: "Cineasta 1" });
        });
        const response = await request(app)
            .put("/api/cineastas/1")
            .set("Authorization", "Bearer your-access-token")
            .send({ nombre: "Cineasta 1" });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 1, nombre: "Cineasta 1" });
    });

    test("Error while updating a cineasta", async () => {
        controller.updateCineasta.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app)
            .put("/api/cineastas/1")
            .set("Authorization", "Bearer your-access-token")
            .send({ nombre: "Cineasta 1" });
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });

    test("Cineasta not found", async () => {
        controller.updateCineasta.mockImplementationOnce((req, res) => {
            res.status(404).send("Cineasta not found");
        });
        const response = await request(app)
            .put("/api/cineastas/1")
            .set("Authorization", "Bearer your-access-token")
            .send({ nombre: "Cineasta 1" });
        expect(response.status).toBe(404);
        expect(response.text).toBe("Cineasta not found");
    });
});

describe("DELETE /api/cineastas/:id - Delete a cineasta", () => {
    test("Successfully delete a cineasta", async () => {
        controller.deleteCineasta.mockImplementationOnce((req, res) => {
            res.json({ id: 1, nombre: "Cineasta 1" });
        });
        const response = await request(app).delete("/api/cineastas/1").set("Authorization", "Bearer your-access-token");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 1, nombre: "Cineasta 1" });
    });

    test("Error while deleting a cineasta", async () => {
        controller.deleteCineasta.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).delete("/api/cineastas/1").set("Authorization", "Bearer your-access-token");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });

    test("Cineasta not found", async () => {
        controller.deleteCineasta.mockImplementationOnce((req, res) => {
            res.status(404).send("Cineasta not found");
        });
        const response = await request(app).delete("/api/cineastas/1").set("Authorization", "Bearer your-access-token");
        expect(response.status).toBe(404);
        expect(response.text).toBe("Cineasta not found");
    });
});
