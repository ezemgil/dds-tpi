import request from "supertest";
import * as nominacionesCineastaController from "../controllers/nominacionesCineastaController.js";
import app from "../src/app.js";

jest.mock("../controllers/nominacionesCineastaController");

const nominacionesCineasta = [
    {
        "id_academia": 3,
        "id_premio": 1,
        "id_pelicula": 2,
        "id_cineasta": 5,
        "id_rol": 3,
        "fecha_nominacion": "2015-07-04",
        "fue_ganador": 1
    },
    {
        "id_academia": 1,
        "id_premio": 2,
        "id_pelicula": 1,
        "id_cineasta": 3,
        "id_rol": 2,
        "fecha_nominacion": "2012-12-01",
        "fue_ganador": 1
    },
    {
        "id_academia": 2,
        "id_premio": 3,
        "id_pelicula": 3,
        "id_cineasta": 2,
        "id_rol": 1,
        "fecha_nominacion": "2010-08-10",
        "fue_ganador": 0
    }
];

// Mockear la funcion nominacionesCineastaController.getNominacionesCineasta
beforeEach(() => {
    nominacionesCineastaController.getNominacionesCineasta.mockImplementation((req, res) => {
        res.json(nominacionesCineasta);
    });
});

// TEST PARA EL ENDPOINT Get all
describe("GET /nominaciones_cineastas - obtener todas las nominaciones de cineastas", () => {
    test("Obtener todas las nominaciones de cineastas exitosamente", async () => {
        const response = await request(app).get("/nominaciones_cineastas");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(nominacionesCineasta);
    });
    
    test("Obtener todas las nominaciones de cineastas falla", async () => {
        nominacionesCineastaController.getNominacionesCineasta.mockImplementationOnce(() => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/nominaciones_cineastas");
        expect(response.status).toBe(500);
    });
});

// TEST PARA EL ENDPOINT Get By ID
describe("GET /nominaciones_cineastas/:academia/:premio/:pelicula/:cineasta/:rol - obtener una nominacion de cineasta por su id", () => {
    test("Obtener una nominacion de cineasta por su id exitosamente", async () => {
        nominacionesCineastaController.getNominacionCineasta.mockImplementationOnce((req, res) => {
            res.json(nominacionesCineasta[0]);
        })
        const response = await request(app).get("/nominaciones_cineastas/3/1/2/5/3");
        expect(response.status).toBe(200); // 200 OK
        expect(response.body).toEqual(nominacionesCineasta[0]);
    });
    
    test("Error al obtener nominacion de cineasta por ID", async () => {
        nominacionesCineastaController.getNominacionCineasta.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/nominaciones_cineastas/3/1/2/5/3");
        expect(response.status).toBe(500); // 500 Internal Server Error
        expect(response.text).toBe("Error");
    });
    
    test("Nominacion de cineasta no encontrada", async () => {
        nominacionesCineastaController.getNominacionCineasta.mockImplementationOnce((req, res) => {
              res.status(404).send("Nominacion de cineasta no encontrada");
        });
        const response = await request(app).get("/nominaciones_cineastas/3/1/2/5/3");
        expect(response.status).toBe(404); // 404 Not Found
        expect(response.text).toBe("Nominacion de cineasta no encontrada");
    });
});

// TEST PARA EL ENDPOINT Create
describe("POST /nominaciones_cineastas - crear una nominacion de cineasta", () => {
    test("Crear una nominacion de cineasta exitosamente", async () => {
        nominacionesCineastaController.createNominacionCineasta.mockImplementationOnce((req, res) => {
            res.json(nominacionesCineasta[0]);
        });
        const response = await request(app)
            .post("/nominaciones_cineastas")
            .send(nominacionesCineasta[0]);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(nominacionesCineasta[0]);
    });
    
    test("Error al crear nominacion de cineasta", async () => {
        nominacionesCineastaController.createNominacionCineasta.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app)
            .post("/nominaciones_cineastas")
            .send(nominacionesCineasta[0]);
        expect(response.status).toBe(500);
    });
});

// TEST PARA EL ENDPOINT Update
describe("PUT /nominaciones_cineastas/:academia/:premio/:pelicula/:cineasta/:rol - actualizar una nominacion de cineasta", () => {
    test("Actualizar una nominacion de cineasta exitosamente", async () => {
        nominacionesCineastaController.updateNominacionCineasta.mockImplementationOnce((req, res) => {
            res.json(nominacionesCineasta[0]);
        });
        const response = await request(app)
            .put("/nominaciones_cineastas/3/1/2/5/3")
            .send(nominacionesCineasta[2]);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(nominacionesCineasta[0]);
    });
    
    test("Error al actualizar nominacion de cineasta", async () => {
        nominacionesCineastaController.updateNominacionCineasta.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app)
            .put("/nominaciones_cineastas/3/1/2/5/3")
            .send(nominacionesCineasta[0]);
        expect(response.status).toBe(500);
    });
});

// TEST PARA EL ENDPOINT Delete
describe("DELETE /nominaciones_cineastas/:academia/:premio/:pelicula/:cineasta/:rol - eliminar una nominacion de cineasta", () => {
    test("Eliminar una nominacion de cineasta exitosamente", async () => {
        nominacionesCineastaController.removeNominacionCineasta.mockImplementationOnce((req, res) => {
            res.json(nominacionesCineasta[0]);
        });
        const response = await request(app).delete("/nominaciones_cineastas/3/1/2/5/3");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(nominacionesCineasta[0]);
    });
    
    test("Error al eliminar nominacion de cineasta", async () => {
        nominacionesCineastaController.removeNominacionCineasta.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).delete("/nominaciones_cineastas/3/1/2/5/3");
        expect(response.status).toBe(500);
    });
    
    test("Nominacion de cineasta no encontrada", async () => {
        nominacionesCineastaController.removeNominacionCineasta.mockImplementationOnce((req, res) => {
            res.status(404).send("Nominacion de cineasta no encontrada");
        });
        const response = await request(app).delete("/nominaciones_cineastas/2/2/2/2/2");
        expect(response.status).toBe(404);
    });
});

