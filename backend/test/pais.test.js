import request from "supertest";
import * as paisController from "../controllers/paisController";
import app from "../src/app";

jest.mock("../controllers/paisController");

const paises = [
    {id: 1, nombre: "España", codigo: "ES"},
    {id: 2, nombre: "Italia", codigo: "IT"},
    {id: 3, nombre: "Francia", codigo: "FR"}
];

// Mockear la funcion paisController.getPaises
beforeEach(() => {
    paisController.getPaises.mockImplementation((req, res) => {
        res.json(paises);
    });
});

// TEST PARA EL ENDPOINT Get all
describe("GET /paises - obtener todos los paises", () => {
    test("Obtener todos los paises exitosamente", async () => {
        const response = await request(app).get("/paises");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(paises);
    });
    
    test("Obtener todos los paises falla", async () => {
        paisController.getPaises.mockImplementationOnce(() => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/paises");
        expect(response.status).toBe(500);
    });
});

// TEST PARA EL ENDPOINT Get By ID
describe("GET /paises/:id - obtener un pais por su id", () => {
    test("Obtener un pais por su id exitosamente", async () => {
        paisController.getPaisById.mockImplementationOnce((req, res) => {
            res.json(paises[0]);
        })
        const response = await request(app).get("/paises/1");
        expect(response.status).toBe(200); // 200 OK
        expect(response.body).toEqual(paises[0]);
    });
    
    test("Error al obtener pais por ID", async () => {
        paisController.getPaisById.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/paises/1");
        expect(response.status).toBe(500); // 500 Internal Server Error
        expect(response.text).toBe("Error");
    });
    
    test("Pais no encontrado", async () => {
        paisController.getPaisById.mockImplementationOnce((req, res) => {
              res.status(404).send("Pais no encontrado");
        });
        const response = await request(app).get("/paises/1");
        expect(response.status).toBe(404); // 404 Not Found
        expect(response.text).toBe("Pais no encontrado");
    });
});

// TEST PARA EL ENDPOINT Create
describe("POST /paises - crear un pais", () => {
    test("Crear un pais exitosamente", async () => {
        paisController.createPais.mockImplementationOnce((req, res) => {
            res.status(201).json(paises[0]);
        });
        const response = await request(app).post("/paises").send(paises[0]);
        expect(response.status).toBe(201); // 201 Created
        expect(response.body).toEqual(paises[0]);
    });

    test("Error al crear un pais", async () => {
        paisController.createPais.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).post("/paises").send(paises[0]);
        expect(response.status).toBe(500); // 500 Internal Server Error
        expect(response.text).toBe("Error");
    });
})

// TEST PARA EL ENDPOINT Update
describe("PUT /paises/:id - actualizar un pais", () => {
    test("Actualizar un pais exitosamente", async () => {
        paisController.updatePais.mockImplementationOnce((req, res) => {
            res.json(paises[0]);
        });
        const response = await request(app).put("/paises/1").send(paises[0]);
        expect(response.status).toBe(200); // 200 OK
        expect(response.body).toEqual(paises[0]);
    });

    test("Error al actualizar un pais", async () => {
        paisController.updatePais.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).put("/paises/1").send(paises[0]);
        expect(response.status).toBe(500); // 500 Internal Server Error
        expect(response.text).toBe("Error");
    });

    test("Pais no encontrado", async () => {
        paisController.updatePais.mockImplementationOnce((req, res) => {
            res.status(404).send("Pais no encontrado");
        });
        const response = await request(app).put("/paises/1").send(paises[0]);
        expect(response.status).toBe(404); // 404 Not Found
        expect(response.text).toBe("Pais no encontrado");
    });
});

// TEST PARA EL ENDPOINT Delete
describe("DELETE /paises/:id - eliminar un pais", () => {
    test("Eliminar un pais exitosamente", async () => {
        paisController.deletePais.mockImplementationOnce((req, res) => {
            res.json(paises[0]);
        });
        const response = await request(app).delete("/paises/1");
        expect(response.status).toBe(200); // 200 OK
        expect(response.body).toEqual(paises[0]);
    });

    test("Error al eliminar un pais", async () => {
        paisController.deletePais.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).delete("/paises/1");
        expect(response.status).toBe(500); // 500 Internal Server Error
        expect(response.text).toBe("Error");
    });

    test("Pais no encontrado", async () => {
        paisController.deletePais.mockImplementationOnce((req, res) => {
            res.status(404).send("Pais no encontrado");
        });
        const response = await request(app).delete("/paises/1");
        expect(response.status).toBe(404); // 404 Not Found
        expect(response.text).toBe("Pais no encontrado");
    });
});

