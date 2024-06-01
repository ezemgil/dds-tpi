import request from "supertest";
import * as tipoRolController from "../controllers/tipoRolController.js";
import app from "../src/app.js";

jest.mock("../controllers/tipoRolController");

const tiposRol = [
    {id: 1, nombre: "Actor"},
    {id: 2, nombre: "Director"},
    {id: 3, nombre: "Productor"}
];

// Mockear la funcion tipoRolController.getTipoRoles
beforeEach(() => {
    tipoRolController.getTiposRol.mockImplementation((req, res) => {
        res.json(tiposRol);
    });
});

// TEST PARA EL ENDPOINT Get all
describe("GET /tipos_rol - obtener todos los tipos de roles", () => {
    test("Obtener todos los tipos de rol exitosamente", async () => {
        const response = await request(app).get("/tipos_rol");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(tiposRol);
    });
});

// TEST PARA EL ENDPOINT Get By ID
describe("GET /tipos_rol/:id - obtener un tipo de rol por su id", () => {
    test("Obtener un tipo de rol por su id exitosamente", async () => {
        tipoRolController.getTipoRolById.mockImplementationOnce((req, res) => {
            res.json(tiposRol[0]);
        })
        const response = await request(app).get("/tipos_rol/1");
        expect(response.status).toBe(200); // 200 OK
        expect(response.body).toEqual(tiposRol[0]);
    });
    
    test("Error al obtener tipo de rol por ID", async () => {
        tipoRolController.getTipoRolById.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/tipos_rol/1");
        expect(response.status).toBe(500); // 500 Internal Server Error
        expect(response.text).toBe("Error");
    });
    
    test("Tipo de rol no encontrado", async () => {
        tipoRolController.getTipoRolById.mockImplementationOnce((req, res) => {
              res.status(404).send("Tipo de rol no encontrado");
        });
        const response = await request(app).get("/tipos_rol/1");
        expect(response.status).toBe(404); // 404 Not Found
        expect(response.text).toBe("Tipo de rol no encontrado");
    });
});

// TEST PARA EL ENDPOINT Create
describe("POST /tipos_rol - crear un nuevo tipo de rol", () => {
    test("Crear un nuevo tipo de rol exitosamente", async () => {
        const nuevoTipoRol = {id: 4, nombre: "Guionista"};
        tipoRolController.createTipoRol.mockImplementationOnce((req, res) => {
            res.status(201).json(nuevoTipoRol);
        });
        const response = await request(app)
            .post("/tipos_rol")
            .send(nuevoTipoRol);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(nuevoTipoRol);
    });
    
    test("Error al crear un nuevo tipo de rol", async () => {
        tipoRolController.createTipoRol.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app)
            .post("/tipos_rol")
            .send({nombre: "Guionista"});
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

// TEST PARA EL ENDPOINT Update
describe("PUT /tipos_rol/:id - actualizar un tipo de rol", () => {
    test("Actualizar un tipo de rol exitosamente", async () => {
        const tipoRolActualizado = {id: 1, nombre: "Actor de reparto"};
        tipoRolController.updateTipoRol.mockImplementationOnce((req, res) => {
            res.json(tipoRolActualizado);
        });
        const response = await request(app)
            .put("/tipos_rol/1")
            .send(tipoRolActualizado);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(tipoRolActualizado);
    });
    
    test("Error al actualizar un tipo de rol", async () => {
        tipoRolController.updateTipoRol.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app)
            .put("/tipos_rol/1")
            .send({nombre: "Actor"});
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

// TEST PARA EL ENDPOINT Delete
describe("DELETE /tipos_rol/:id - eliminar un tipo de rol", () => {
    test("Eliminar un tipo de rol exitosamente", async () => {
        tipoRolController.deleteTipoRol.mockImplementationOnce((req, res) => {
            res.send("Tipo de rol eliminado");
        });
        const response = await request(app).delete("/tipos_rol/1");
        expect(response.status).toBe(200);
        expect(response.text).toBe("Tipo de rol eliminado");
    });
    
    test("Error al eliminar un tipo de rol", async () => {
        tipoRolController.deleteTipoRol.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).delete("/tipos_rol/1");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
    
    test("Tipo de rol no encontrado", async () => {
        tipoRolController.deleteTipoRol.mockImplementationOnce((req, res) => {
            res.status(404).send("Tipo de rol no encontrado");
        });
        const response = await request(app).delete("/tipos_rol/1");
        expect(response.status).toBe(404);
        expect(response.text).toBe("Tipo de rol no encontrado");
    });
});
