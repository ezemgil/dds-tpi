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

describe("GET /api/peliculas/buscar - Obtener una pelicula por nombre", () => {
    test("Se obtuvo una pelicula por nombre exitosamente", async () => {
        const response = await request(app).get("/api/peliculas/buscar");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(peliculas);
    });
});

describe("GET /api/peliculas/random - Obtener peliculas aleatorias", () => {
    test("Se obtuvieron peliculas aleatorias exitosamente", async () => {
        const response = await request(app).get("/api/peliculas/random");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(peliculas);
    });
});

describe("GET /api/peliculas/:id/elenco - Obtener el elenco de una pelicula", () => {
    test("Se obtuvo el elenco de una pelicula exitosamente", async () => {
        const response = await request(app).get("/api/peliculas/1/elenco");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(peliculas[0]);
    });
});

describe("GET /api/peliculas - Obtener todas las peliculas", () => {
    test("Se obtuvieron todas las peliculas exitosamente", async () => {
        const response = await request(app).get("/api/peliculas");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(peliculas);
    });
});

describe("GET /api/peliculas/:id - Obtener pelicula por ID", () => {
    test("Se obtuvo una pelicula por ID exitosamente", async () => {
        const response = await request(app).get("/api/peliculas/1");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(peliculas[0]);
    });
});

describe("POST /api/peliculas - Crear una pelicula", () => {
    test("Se creo una pelicula exitosamente", async () => {
        const response = await request(app)
            .post("/api/peliculas")
            .set("Authorization", "Bearer your-access-token")
            .send(peliculas[0]);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(peliculas[0]);
    });
});

describe("POST /api/peliculas/:id/cineastas - Añadir un cineasta a una pelicula", () => {
    test("Se añadio un cineasta exitosamente", async () => {
        const response = await request(app)
            .post("/api/peliculas/1/cineastas")
            .set("Authorization", "Bearer your-access-token")
            .send(peliculas[0]);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(peliculas[0]);
    });
});

describe("PUT /api/peliculas/:id - Actualizar una pelicula", () => {
    test("Se actualizo una pelicula exitosamente", async () => {
        const response = await request(app)
            .put("/api/peliculas/1")
            .set("Authorization", "Bearer your-access-token")
            .send(peliculas[0]);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(peliculas[0]);
    });
});

describe("PUT /api/peliculas/:id/cineastas - Actualizar el elenco de una pelicula", () => {
    test("Se actualizo el elenco de una pelicula exitosamente", async () => {
        const response = await request(app)
            .put("/api/peliculas/1/cineastas")
            .set("Authorization", "Bearer your-access-token")
            .send(peliculas[0]);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(peliculas[0]);
    });
});

describe("DELETE /api/peliculas/:id/cineastas/:cineasta - Eliminar el cineasta de una pelicula", () => {
    test("Se elimino el cineasta de una pelicula exitosamente", async () => {
        const response = await request(app)
            .delete("/api/peliculas/1/cineastas/1")
            .set("Authorization", "Bearer your-access-token");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(peliculas[0]);
    });
});

describe("DELETE /api/peliculas/:id - Eliminar una pelicula", () => {
    test("Se elimino una pelicula exitosmante", async () => {
        const response = await request(app).delete("/api/peliculas/1").set("Authorization", "Bearer your-access-token");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(peliculas[0]);
    });
});
