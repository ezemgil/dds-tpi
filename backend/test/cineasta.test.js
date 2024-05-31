import request from "supertest";
import * as cineastaController from "../controllers/cineastaController.js";
import app from "../src/app.js";

jest.mock("../controllers/cineastaController");

const cineastas = [
    {
        id: 1,
        nombre: "Pedro",
        apellido: "Almodovar",
        fecha_nacimiento: "1949-09-25",
        nacionalidad: 3,
        nacionalidad2: null,
    },
    {
        id: 2,
        nombre: "Alejandro",
        apellido: "Amenabar",
        fecha_nacimiento: "1972-03-31",
        nacionalidad: 3,
        nacionalidad2: null,
    },
    {
        id: 3,
        nombre: "Guillermo",
        apellido: "del Toro",
        fecha_nacimiento: "1964-10-09",
        nacionalidad: 4,
        nacionalidad2: null,
    }
];

// Mockear la funcion cineastaController.getCineastas
beforeEach(() => {
    cineastaController.getCineastas.mockImplementation((req, res) => {
        res.json(cineastas);
    });
});

// TEST PARA EL ENDPOINT Get all
describe("GET /cineastas - obtener todos los cineastas", () => {
    test("Obtener todos los cineastas exitosamente", async () => {
        const response = await request(app).get("/cineastas");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(cineastas);
    });
    
    test("Obtener todos los cineastas falla", async () => {
        cineastaController.getCineastas.mockImplementationOnce(() => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/cineastas");
        expect(response.status).toBe(500);
    });
});

// TEST PARA EL ENDPOINT Get By ID
describe("GET /cineastas/:id - obtener un cineasta por su id", () => {
    test("Obtener un cineasta por su id exitosamente", async () => {
        cineastaController.getCineastaById.mockImplementationOnce((req, res) => {
            res.json(cineastas[0]);
        })
        const response = await request(app).get("/cineastas/1");
        expect(response.status).toBe(200); // 200 OK
        expect(response.body).toEqual(cineastas[0]);
    });
    
    test("Error al obtener cineasta por ID", async () => {
        cineastaController.getCineastaById.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/cineastas/1");
        expect(response.status).toBe(500); // 500 Internal Server Error
        expect(response.text).toBe("Error");
    });
    
    test("Cineasta no encontrado", async () => {
        cineastaController.getCineastaById.mockImplementationOnce((req, res) => {
              res.status(404).send("Cineasta no encontrado");
        });
        const response = await request(app).get("/cineastas/1");
        expect(response.status).toBe(404); // 404 Not Found
        expect(response.text).toBe("Cineasta no encontrado");
    });
});

// TEST PARA EL ENDPOINT Create
describe("POST /cineastas - crear un cineasta", () => {
    test("Crear un cineasta exitosamente", async () => {
        const nuevoCineasta = {
            id: 4,
            nombre: "Martin",
            apellido: "Scorsese",
            fecha_nacimiento: "1942-11-17",
            nacionalidad: 1,
            nacionalidad2: null,
        };
        cineastaController.createCineasta.mockImplementationOnce((req, res) => {
            res.status(201).json(nuevoCineasta);
        });
        const response = await request(app)
            .post("/cineastas")
            .send(nuevoCineasta);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(nuevoCineasta);
    });

    test("Error al crear un cineasta", async () => {
        const nuevoCineasta = {
            id: 4,
            nombre: "Martin",
            apellido: "Scorsese",
            fecha_nacimiento: "1942-11-17",
            nacionalidad: 1,
            nacionalidad2: null,
        };
        cineastaController.createCineasta.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app)
            .post("/cineastas")
            .send(nuevoCineasta);
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

// TEST PARA EL ENDPOINT Update
describe("PUT /cineastas/:id - actualizar un cineasta", () => {
    test("Actualizar un cineasta exitosamente", async () => {
        const cineastaActualizado = {
            id: 1,
            nombre: "Pedro",
            apellido: "Almodovar",
            fecha_nacimiento: "1949-09-25",
            nacionalidad: 3,
            nacionalidad2: null,
        };
        cineastaController.updateCineasta.mockImplementationOnce((req, res) => {
            res.json(cineastaActualizado);
        });
        const response = await request(app)
            .put("/cineastas/1")
            .send(cineastaActualizado);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(cineastaActualizado);
    });

    test("Error al actualizar un cineasta", async () => {
        const cineastaActualizado = {
            id: 1,
            nombre: "Pedro",
            apellido: "Almodovar",
            fecha_nacimiento: "1949-09-25",
            nacionalidad: 3,
            nacionalidad2: null,
        };
        cineastaController.updateCineasta.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app)
            .put("/cineastas/1")
            .send(cineastaActualizado);
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });

    test("Cineasta no encontrado", async () => {
        const cineastaActualizado = {
            id: 30,
            nombre: "Act_Pedro",
            apellido: "Act_Almodovar",
            fecha_nacimiento: "1900-09-25",
            nacionalidad: 2,
            nacionalidad2: null,
        };
        cineastaController.updateCineasta.mockImplementationOnce((req, res) => {
            res.status(404).send("Cineasta no encontrado");
        });
        const response = await request(app)
            .put("/cineastas/1")
            .send(cineastaActualizado);
        expect(response.status).toBe(404);
        expect(response.text).toBe("Cineasta no encontrado");
    });
});

// TEST PARA EL ENDPOINT Delete
describe("DELETE /cineastas/:id - eliminar un cineasta", () => {
    test("Eliminar un cineasta exitosamente", async () => {
        cineastaController.deleteCineasta.mockImplementationOnce((req, res) => {
            res.json(cineastas[0]);
        });
        const response = await request(app).delete("/cineastas/1");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(cineastas[0]);
    });

    test("Error al eliminar un cineasta", async () => {
        cineastaController.deleteCineasta.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).delete("/cineastas/1");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });

    test("Cineasta no encontrado", async () => {
        cineastaController.deleteCineasta.mockImplementationOnce((req, res) => {
            res.status(404).send("Cineasta no encontrado");
        });
        const response = await request(app).delete("/cineastas/1");
        expect(response.status).toBe(404);
        expect(response.text).toBe("Cineasta no encontrado");
    });
});
