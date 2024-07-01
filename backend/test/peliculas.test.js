import request from "supertest";
import app from "../src/app.js";
import * as controller from "../src/controllers/pelicula.controller.js";

jest.mock("../src/controllers/pelicula.controller.js");
jest.mock("../src/middleware/auth.js", () => {
    return {
        authentificateJWT: (req, res, next) => {
            next();
        },
    };
});

const peliculas = [
    { id: 1, nombre: "Pelicula 1" },
    { id: 2, nombre: "Pelicula 2" },
    { id: 3, nombre: "Pelicula 3" },
    { id: 4, nombre: "Pelicula 4" },
];

// Mock the controller functions
beforeEach(() => {
    controller.getPeliculaByNombre.mockImplementation((req, res) => {
        res.json(peliculas);
    });

    controller.getPeliculasAleatorias.mockImplementation((req, res) => {
        res.json(peliculas);
    });

    controller.getElenco.mockImplementation((req, res) => {
        res.json(peliculas[0]);
    });

    controller.getPeliculas.mockImplementation((req, res) => {
        res.json(peliculas);
    });

    controller.getPeliculaById.mockImplementation((req, res) => {
        res.json(peliculas[0]);
    });

    controller.createPelicula.mockImplementation((req, res) => {
        res.json(peliculas[0]);
    });

    controller.addCineastas.mockImplementation((req, res) => {
        res.json(peliculas[0]);
    });

    controller.updatePelicula.mockImplementation((req, res) => {
        res.json(peliculas[0]);
    });

    controller.updateElenco.mockImplementation((req, res) => {
        res.json(peliculas[0]);
    });

    controller.removeCineasta.mockImplementation((req, res) => {
        res.json(peliculas[0]);
    });

    controller.deletePelicula.mockImplementation((req, res) => {
        res.json(peliculas[0]);
    });
});

describe("GET /api/peliculas/buscar - Get pelicula by nombre", () => {
    test("Successfully get pelicula by nombre", async () => {
        const response = await request(app).get("/api/peliculas/buscar");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(peliculas);
    });
});

describe("GET /api/peliculas/random - Get random peliculas", () => {
    test("Successfully get random peliculas", async () => {
        const response = await request(app).get("/api/peliculas/random");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(peliculas);
    });
});

describe("GET /api/peliculas/:id/elenco - Get elenco of pelicula", () => {
    test("Successfully get elenco of pelicula", async () => {
        const response = await request(app).get("/api/peliculas/1/elenco");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(peliculas[0]);
    });
});

describe("GET /api/peliculas - Get all peliculas", () => {
    test("Successfully get all peliculas", async () => {
        const response = await request(app).get("/api/peliculas");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(peliculas);
    });
});

describe("GET /api/peliculas/:id - Get pelicula by ID", () => {
    test("Successfully get pelicula by ID", async () => {
        const response = await request(app).get("/api/peliculas/1");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(peliculas[0]);
    });
});

describe("POST /api/peliculas - Create a pelicula", () => {
    test("Successfully create a pelicula", async () => {
        const response = await request(app)
            .post("/api/peliculas")
            .set("Authorization", "Bearer your-access-token")
            .send(peliculas[0]);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(peliculas[0]);
    });
});

describe("POST /api/peliculas/:id/cineastas - Add cineastas to pelicula", () => {
    test("Successfully add cineastas to pelicula", async () => {
        const response = await request(app)
            .post("/api/peliculas/1/cineastas")
            .set("Authorization", "Bearer your-access-token")
            .send(peliculas[0]);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(peliculas[0]);
    });
});

describe("PUT /api/peliculas/:id - Update a pelicula", () => {
    test("Successfully update a pelicula", async () => {
        const response = await request(app)
            .put("/api/peliculas/1")
            .set("Authorization", "Bearer your-access-token")
            .send(peliculas[0]);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(peliculas[0]);
    });
});

describe("PUT /api/peliculas/:id/cineastas - Update elenco of pelicula", () => {
    test("Successfully update elenco of pelicula", async () => {
        const response = await request(app)
            .put("/api/peliculas/1/cineastas")
            .set("Authorization", "Bearer your-access-token")
            .send(peliculas[0]);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(peliculas[0]);
    });
});

describe("DELETE /api/peliculas/:id/cineastas/:cineasta - Remove cineasta from pelicula", () => {
    test("Successfully remove cineasta from pelicula", async () => {
        const response = await request(app)
            .delete("/api/peliculas/1/cineastas/1")
            .set("Authorization", "Bearer your-access-token");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(peliculas[0]);
    });
});

describe("DELETE /api/peliculas/:id - Delete a pelicula", () => {
    test("Successfully delete a pelicula", async () => {
        const response = await request(app).delete("/api/peliculas/1").set("Authorization", "Bearer your-access-token");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(peliculas[0]);
    });
});
