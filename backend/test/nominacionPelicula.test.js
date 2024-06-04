import request  from "supertest";
import app from "../src/app.js";
import * as nominacion_peliculaController from "../controllers/nominacion_peliculaController.js";

jest.mock("../controllers/nominacion_peliculaController.js");

const nominaciones_pelicula = [
    { id_academia: 1, id_premio: 1, id_pelicula: 1, fecha_nominacion: "2021-10-10", fue_ganador: 1},
    { id_academia: 2, id_premio: 2, id_pelicula: 2, fecha_nominacion: "2019-12-08", fue_ganador: 1},
    { id_academia: 3, id_premio: 3, id_pelicula: 3, fecha_nominacion: "2023-09-12", fue_ganador: 0},
    { id_academia: 4, id_premio: 4, id_pelicula: 4, fecha_nominacion: "2007-01-07", fue_ganador: 0 },
];

// Mockear la funcion nominacion_peliculaController.getNominacionesPelicula
beforeEach(() => {
    nominacion_peliculaController.getNominacionesPelicula.mockImplementation((req, res) => {
        res.json(nominaciones_pelicula);
    });
});

describe("GET /nominaciones_pelicula - Obtener todas las nominaciones de pelicula", () => {
    test("Obtener todas las nominaciones de pelicula exitosamente", async () => {
        const response = await request(app).get("/nominaciones_pelicula");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(nominaciones_pelicula);
    });

    test("Error al obtener todas las nominaciones de pelicula", async () => {
        nominacion_peliculaController.getNominacionesPelicula.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/nominaciones_pelicula");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

// Mockear la funcion nominacion_peliculaController.getNominacionPeliculaById
describe("GET /nominaciones_pelicula/:id_academia/:id_premio/:id_pelicula - Obtener nominacion de pelicula por ID", () => {
    test("Obtener nominacion de pelicula por ID exitosamente", async () => {
        nominacion_peliculaController.getNominacionPeliculaById.mockImplementationOnce((req, res) => {
            res.json(nominaciones_pelicula[0]);
        });
        const response = await request(app).get("/nominaciones_pelicula/1/1/1");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(nominaciones_pelicula[0]);
    });
    test("Error al obtener nominacion de pelicula por ID", async () => {
        nominacion_peliculaController.getNominacionPeliculaById.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/nominaciones_pelicula/1/1/1");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
    test("Nominacion de pelicula no encontrada", async () => {
        nominacion_peliculaController.getNominacionPeliculaById.mockImplementationOnce((req, res) => {
            res.status(404).send("Nominacion de pelicula no encontrada");
        });
        const response = await request(app).get("/nominaciones_pelicula/1/1/1");
        expect(response.status).toBe(404);
        expect(response.text).toBe("Nominacion de pelicula no encontrada");
    });
});

// Mockear la funcion nominacion_peliculaController.getNominacionPeliculaByAcademia
describe("GET /nominaciones_pelicula/academia/:id_academia - Obtener nominacion de pelicula por academia", () => {
    test("Obtener nominacion de pelicula por academia exitosamente", async () => {
        nominacion_peliculaController.getNominacionPeliculaByAcademia.mockImplementationOnce((req, res) => {
            res.json(nominaciones_pelicula[0]);
        });
        const response = await request(app).get("/nominaciones_pelicula/academia/1");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(nominaciones_pelicula[0]);
    });
    test("Error al obtener nominacion de pelicula por academia", async () => {
        nominacion_peliculaController.getNominacionPeliculaByAcademia.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/nominaciones_pelicula/academia/1");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
    test("Nominacion de pelicula por academia no encontrada", async () => {
        nominacion_peliculaController.getNominacionPeliculaByAcademia.mockImplementationOnce((req, res) => {
            res.status(404).send("Nominacion de pelicula por academia no encontrada");
        });
        const response = await request(app).get("/nominaciones_pelicula/academia/1");
        expect(response.status).toBe(404);
        expect(response.text).toBe("Nominacion de pelicula por academia no encontrada");
    });
});

// Mockear la funcion nominacion_peliculaController.getNominacionPeliculaByPremio
describe("GET /nominaciones_pelicula/premio/:id_premio - Obtener nominacion de pelicula por premio", () => {
    test("Obtener nominacion de pelicula por premio exitosamente", async () => {
        nominacion_peliculaController.getNominacionPeliculaByPremio.mockImplementationOnce((req, res) => {
            res.json(nominaciones_pelicula[0]);
        });
        const response = await request(app).get("/nominaciones_pelicula/premio/1");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(nominaciones_pelicula[0]);
    });
    test("Error al obtener nominacion de pelicula por premio", async () => {
        nominacion_peliculaController.getNominacionPeliculaByPremio.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/nominaciones_pelicula/premio/1");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
    test("Nominacion de pelicula por premio no encontrada", async () => {
        nominacion_peliculaController.getNominacionPeliculaByPremio.mockImplementationOnce((req, res) => {
            res.status(404).send("Nominacion de pelicula por premio no encontrada");
        });
        const response = await request(app).get("/nominaciones_pelicula/premio/1");
        expect(response.status).toBe(404);
        expect(response.text).toBe("Nominacion de pelicula por premio no encontrada");
    });
});

// Mockear la funcion nominacion_peliculaController.getNominacionPeliculaByPelicula
describe("GET /nominaciones_pelicula/pelicula/:id_pelicula - Obtener nominacion de pelicula por pelicula", () => {
    test("Obtener nominacion de pelicula por pelicula exitosamente", async () => {
        nominacion_peliculaController.getNominacionPeliculaByPelicula.mockImplementationOnce((req, res) => {
            res.json(nominaciones_pelicula[0]);
        });
        const response = await request(app).get("/nominaciones_pelicula/pelicula/1");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(nominaciones_pelicula[0]);
    });
    test("Error al obtener nominacion de pelicula por pelicula", async () => {
        nominacion_peliculaController.getNominacionPeliculaByPelicula.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/nominaciones_pelicula/pelicula/1");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
    test("Nominacion de pelicula por pelicula no encontrada", async () => {
        nominacion_peliculaController.getNominacionPeliculaByPelicula.mockImplementationOnce((req, res) => {
            res.status(404).send("Nominacion de pelicula por pelicula no encontrada");
        });
        const response = await request(app).get("/nominaciones_pelicula/pelicula/1");
        expect(response.status).toBe(404);
        expect(response.text).toBe("Nominacion de pelicula por pelicula no encontrada");
    });
});

// Mockear la funcion nominacion_peliculaController.createNominacionPelicula
describe("POST /nominaciones_pelicula - Crear una nominacion de pelicula", () => {
    test("Crear nominacion de pelicula exitosamente", async () => {
        nominacion_peliculaController.createNominacionPelicula.mockImplementationOnce((req, res) => {
            res.json(nominaciones_pelicula[0]);
        });
        const response = await request(app).post("/nominaciones_pelicula").send(nominaciones_pelicula[0]);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(nominaciones_pelicula[0]);
    });
    test("Error al crear nominacion de pelicula", async () => {
        nominacion_peliculaController.createNominacionPelicula.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).post("/nominaciones_pelicula").send(nominaciones_pelicula[0]);
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

// Mockear la funcion nominacion_peliculaController.updateNominacion
describe("PUT /nominaciones_pelicula/:id_academia/:id_premio/:id_pelicula - Actualizar una nominacion de pelicula", () => {
    test("Actualizar nominacion de pelicula exitosamente", async () => {
        nominacion_peliculaController.updateNominacion.mockImplementationOnce((req, res) => {
            res.json(nominaciones_pelicula[0]);
        });
        const response = await request(app).put("/nominaciones_pelicula/1/1/1").send(nominaciones_pelicula[0]);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(nominaciones_pelicula[0]);
    });
    test("Error al actualizar nominacion de pelicula", async () => {
        nominacion_peliculaController.updateNominacion.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).put("/nominaciones_pelicula/1/1/1").send(nominaciones_pelicula[0]);
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

// Mockear la funcion nominacion_peliculaController.deleteNominacionPelicula
describe("DELETE /nominaciones_pelicula/:id_academia/:id_premio/:id_pelicula - Eliminar una nominacion de pelicula", () => {
    test("Eliminar nominacion de pelicula exitosamente", async () => {
        nominacion_peliculaController.deleteNominacionPelicula.mockImplementationOnce((req, res) => {
            res.json(nominaciones_pelicula[0]);
        });
        const response = await request(app).delete("/nominaciones_pelicula/1/1/1");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(nominaciones_pelicula[0]);
    });
    test("Error al eliminar nominacion de pelicula", async () => {
        nominacion_peliculaController.deleteNominacionPelicula.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).delete("/nominaciones_pelicula/1/1/1");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

