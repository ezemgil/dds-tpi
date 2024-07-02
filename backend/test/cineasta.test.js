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

describe("GET /api/cineastas/buscar - Obtener cineastas por nombre", () => {
    test("Se obtuvieron cineatas por nombre exitosamente", async () => {
        controller.getCineastasByName.mockImplementationOnce((req, res) => {
            res.json([{ id: 1, nombre: "Cineasta 1" }]);
        });
        const response = await request(app).get("/api/cineastas/buscar?nombre=Cineasta");
        expect(response.status).toBe(200);
        expect(response.body).toEqual([{ id: 1, nombre: "Cineasta 1" }]);
    });

    test("Error al obtener cineastas por nombre", async () => {
        controller.getCineastasByName.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/api/cineastas/buscar?nombre=Cineasta");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

describe("GET /api/cineastas/:id/peliculas - Obtener peliculas por ID de cineasta", () => {
    test("Se obtuvieron las peliculas por el ID del cineasta", async () => {
        controller.getPeliculasByCineasta.mockImplementationOnce((req, res) => {
            res.json([{ id: 1, titulo: "Pelicula 1" }]);
        });
        const response = await request(app).get("/api/cineastas/1/peliculas");
        expect(response.status).toBe(200);
        expect(response.body).toEqual([{ id: 1, titulo: "Pelicula 1" }]);
    });

    test("Error al obtener peliculas por el ID de cineastas", async () => {
        controller.getPeliculasByCineasta.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/api/cineastas/1/peliculas");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

describe("GET /api/cineastas/random - Obtener cineastas aleatorios", () => {
    test(" Se obtuvieron cineastas aleatorios", async () => {
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

    test("Error al obtener cineastas aleatorios", async () => {
        controller.getCineastasAleatorios.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/api/cineastas/random");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

describe("GET /api/cineastas - Otbener todos los cineastas", () => {
    test("Se obtuvieron todos los cineastas exitosamente", async () => {
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

    test("Error al obtener todos los cineastas", async () => {
        controller.getCineastas.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/api/cineastas");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

describe("GET /api/cineastas/:id - Obtener cineasta por ID", () => {
    test("Se obtuvo el cineasta por ID exitosamente", async () => {
        controller.getCineastaById.mockImplementationOnce((req, res) => {
            res.json({ id: 1, nombre: "Cineasta 1" });
        });
        const response = await request(app).get("/api/cineastas/1");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 1, nombre: "Cineasta 1" });
    });

    test("Error al obtener un cineasta por ID", async () => {
        controller.getCineastaById.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/api/cineastas/1");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });

    test("Cineasta no encontrado", async () => {
        controller.getCineastaById.mockImplementationOnce((req, res) => {
            res.status(404).send("Cineasta not found");
        });
        const response = await request(app).get("/api/cineastas/1");
        expect(response.status).toBe(404);
        expect(response.text).toBe("Cineasta not found");
    });
});

describe("POST /api/cineastas - Crear un cineastas", () => {
    test("Se creo un cineastas exitosamente", async () => {
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

    test("Error al crear un cineastas", async () => {
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

describe("PUT /api/cineastas/:id - Actualizar un cineastas", () => {
    test("Se actualizo un cineasta exitosamente", async () => {
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

    test("Error al actualizar un cineasta", async () => {
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

    test("Cineasta no encontrado", async () => {
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

describe("DELETE /api/cineastas/:id - Eliminar un cineasta", () => {
    test("Se elimino un cineasta exitosamente", async () => {
        controller.deleteCineasta.mockImplementationOnce((req, res) => {
            res.json({ id: 1, nombre: "Cineasta 1" });
        });
        const response = await request(app).delete("/api/cineastas/1").set("Authorization", "Bearer your-access-token");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 1, nombre: "Cineasta 1" });
    });

    test("Error al eliminar un cineasta", async () => {
        controller.deleteCineasta.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).delete("/api/cineastas/1").set("Authorization", "Bearer your-access-token");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });

    test("Cineasta no encontrado", async () => {
        controller.deleteCineasta.mockImplementationOnce((req, res) => {
            res.status(404).send("Cineasta not found");
        });
        const response = await request(app).delete("/api/cineastas/1").set("Authorization", "Bearer your-access-token");
        expect(response.status).toBe(404);
        expect(response.text).toBe("Cineasta not found");
    });
});
