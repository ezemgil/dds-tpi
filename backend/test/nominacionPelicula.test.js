import request from "supertest";
import app from "../src/app.js";
import * as controller from "../src/controllers/nominacionPelicula.controller.js";

jest.mock("../src/controllers/nominacionPelicula.controller.js");
jest.mock("../src/middleware/auth.js", () => {
    return {
        authentificateJWT: (req, res, next) => {
            next();
        },
    };
});

describe("GET /api/nominaciones_pelicula - Get all nominaciones_pelicula", () => {
    test("Successfully get all nominaciones_pelicula", async () => {
        const nominaciones = [
            { id: 1, peliculaId: 1, categoria: "Mejor Película" },
            { id: 2, peliculaId: 2, categoria: "Mejor Director" },
        ];
        controller.getNominacionesPelicula.mockImplementationOnce((req, res) => {
            res.json(nominaciones);
        });
        const response = await request(app).get("/api/nominaciones_pelicula");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(nominaciones);
    });

    test("Error while getting all nominaciones_pelicula", async () => {
        controller.getNominacionesPelicula.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/api/nominaciones_pelicula");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

describe("GET /api/nominaciones_pelicula/pelicula/:id - Get nominaciones_pelicula by pelicula ID", () => {
    test("Successfully get nominaciones_pelicula by pelicula ID", async () => {
        const nominaciones = [
            { id: 1, peliculaId: 1, categoria: "Mejor Película" },
            { id: 2, peliculaId: 1, categoria: "Mejor Director" },
        ];
        controller.getNominacionesByPelicula.mockImplementationOnce((req, res) => {
            res.json(nominaciones);
        });
        const response = await request(app).get("/api/nominaciones_pelicula/pelicula/1");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(nominaciones);
    });

    test("Error while getting nominaciones_pelicula by pelicula ID", async () => {
        controller.getNominacionesByPelicula.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/api/nominaciones_pelicula/pelicula/1");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

describe("GET /api/nominaciones_pelicula/:id - Get nominacion_pelicula by ID", () => {
    test("Successfully get nominacion_pelicula by ID", async () => {
        controller.getNominacionPeliculaById.mockImplementationOnce((req, res) => {
            res.json({ id: 1, peliculaId: 1, categoria: "Mejor Película" });
        });
        const response = await request(app).get("/api/nominaciones_pelicula/1");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 1, peliculaId: 1, categoria: "Mejor Película" });
    });

    test("Error while getting nominacion_pelicula by ID", async () => {
        controller.getNominacionPeliculaById.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/api/nominaciones_pelicula/1");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

describe("POST /api/nominaciones_pelicula - Create a nominacion_pelicula", () => {
    test("Successfully create a nominacion_pelicula", async () => {
        controller.createNominacionPelicula.mockImplementationOnce((req, res) => {
            res.json({ id: 1, peliculaId: 1, categoria: "Mejor Película" });
        });
        const response = await request(app)
            .post("/api/nominaciones_pelicula")
            .set("Authorization", "Bearer your-access-token")
            .send({ peliculaId: 1, categoria: "Mejor Película" });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 1, peliculaId: 1, categoria: "Mejor Película" });
    });

    test("Error while creating a nominacion_pelicula", async () => {
        controller.createNominacionPelicula.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app)
            .post("/api/nominaciones_pelicula")
            .set("Authorization", "Bearer your-access-token")
            .send({ peliculaId: 1, categoria: "Mejor Película" });
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

describe("PUT /api/nominaciones_pelicula/:id - Update a nominacion_pelicula", () => {
    test("Successfully update a nominacion_pelicula", async () => {
        controller.updateNominacion.mockImplementationOnce((req, res) => {
            res.json({ id: 1, peliculaId: 1, categoria: "Mejor Película" });
        });
        const response = await request(app)
            .put("/api/nominaciones_pelicula/1")
            .set("Authorization", "Bearer your-access-token")
            .send({ categoria: "Mejor Película" });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 1, peliculaId: 1, categoria: "Mejor Película" });
    });

    test("Error while updating a nominacion_pelicula", async () => {
        controller.updateNominacion.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app)
            .put("/api/nominaciones_pelicula/1")
            .set("Authorization", "Bearer your-access-token")
            .send({ categoria: "Mejor Película" });
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

describe("PUT /api/nominaciones_pelicula/pelicula/:id - Update nominaciones_pelicula by pelicula ID", () => {
    test("Successfully update nominaciones_pelicula by pelicula ID", async () => {
        controller.updateNominacionesPelicula.mockImplementationOnce((req, res) => {
            res.json({ id: 1, peliculaId: 1, categoria: "Mejor Película" });
        });
        const response = await request(app)
            .put("/api/nominaciones_pelicula/pelicula/1")
            .set("Authorization", "Bearer your-access-token")
            .send({ categoria: "Mejor Película" });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 1, peliculaId: 1, categoria: "Mejor Película" });
    });

    test("Error while updating nominaciones_pelicula by pelicula ID", async () => {
        controller.updateNominacionesPelicula.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app)
            .put("/api/nominaciones_pelicula/pelicula/1")
            .set("Authorization", "Bearer your-access-token")
            .send({ categoria: "Mejor Película" });
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

describe("DELETE /api/nominaciones_pelicula/:id - Delete a nominacion_pelicula", () => {
    test("Successfully delete a nominacion_pelicula", async () => {
        controller.deleteNominacionPelicula.mockImplementationOnce((req, res) => {
            res.json({ id: 1, peliculaId: 1, categoria: "Mejor Película" });
        });
        const response = await request(app)
            .delete("/api/nominaciones_pelicula/1")
            .set("Authorization", "Bearer your-access-token");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 1, peliculaId: 1, categoria: "Mejor Película" });
    });

    test("Error while deleting a nominacion_pelicula", async () => {
        controller.deleteNominacionPelicula.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app)
            .delete("/api/nominaciones_pelicula/1")
            .set("Authorization", "Bearer your-access-token");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});
