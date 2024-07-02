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

describe("GET /api/nominaciones_pelicula - Obtener todas las nominaciones_pelicula", () => {
    test("Se obtuvieron todas las nominaciones_pelicula exitosamente", async () => {
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

    test("Error mientras se obtenian todas las nominaciones_pelicula", async () => {
        controller.getNominacionesPelicula.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/api/nominaciones_pelicula");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

describe("GET /api/nominaciones_pelicula/pelicula/:id - Obtener nominaciones_pelicula por ID de peliculaq", () => {
    test("Se obtuvieron las nominaciones_pelicula por ID pelicula exitosamente", async () => {
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

    test("Error mientras se obtenia la nominacion_pelicula por ID de pelicula", async () => {
        controller.getNominacionesByPelicula.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/api/nominaciones_pelicula/pelicula/1");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

describe("GET /api/nominaciones_pelicula/:id - Obtener nominacion_pelicula por ID", () => {
    test("Se obtuvo la nominacion_pelicula por ID exitosamente", async () => {
        controller.getNominacionPeliculaById.mockImplementationOnce((req, res) => {
            res.json({ id: 1, peliculaId: 1, categoria: "Mejor Película" });
        });
        const response = await request(app).get("/api/nominaciones_pelicula/1");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 1, peliculaId: 1, categoria: "Mejor Película" });
    });

    test("Error mientras se obtenia nominacion_pelicula por ID", async () => {
        controller.getNominacionPeliculaById.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/api/nominaciones_pelicula/1");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

describe("POST /api/nominaciones_pelicula - Crear una nominacion_pelicula", () => {
    test("Se creo una nominacion_pelicula exitosamente", async () => {
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

    test("Error al crear una nominacion_pelicula", async () => {
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

describe("PUT /api/nominaciones_pelicula/:id - Actualizar una nominacion_pelicula", () => {
    test("Se actualizo una nominacion_pelicula exitosamente", async () => {
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

    test("Error al actualizar una nominacion_pelicula", async () => {
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

describe("PUT /api/nominaciones_pelicula/pelicula/:id - Actualizar una nominacion_pelicula por ID de pelicula", () => {
    test("Se actualizo nominacion_pelicula por ID de pelicula exitosamente", async () => {
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

    test("Error al actualizar nominacion_pelicula por ID de pelicula", async () => {
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

describe("DELETE /api/nominaciones_pelicula/:id - Eliminar nominacion_pelicula", () => {
    test("Se elimino una nominacion_pelicula exitosamente", async () => {
        controller.deleteNominacionPelicula.mockImplementationOnce((req, res) => {
            res.json({ id: 1, peliculaId: 1, categoria: "Mejor Película" });
        });
        const response = await request(app)
            .delete("/api/nominaciones_pelicula/1")
            .set("Authorization", "Bearer your-access-token");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 1, peliculaId: 1, categoria: "Mejor Película" });
    });

    test("Error al eliminar una nominacion_pelicula", async () => {
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
