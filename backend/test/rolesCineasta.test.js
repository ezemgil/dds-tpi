import request from "supertest";
import * as rolesCineastaController from "../controllers/rolesCineastaController.js";
import app from "../src/app.js";

jest.mock("../controllers/rolesCineastaController");

const rolesCineasta = [
    {"id_cineasta": 1,"id_rol": 1},
    {"id_cineasta": 1,"id_rol": 2},
    {"id_cineasta": 2,"id_rol": 2},
    {"id_cineasta": 3,"id_rol": 4}
]

// Mockear la funcion rolesCineastaController.getRolesCineasta
beforeEach(() => {
    rolesCineastaController.getRolesCineasta.mockImplementation((req, res) => {
        res.json(rolesCineasta);
    });
});

//TEST PARA EL ENDPOINT Get all
describe("GET /roles_cineastas - obtener todos los roles de cineastas", () => {
    test("Obtener todos los roles de cineastas exitosamente", async () => {
        const response = await request(app).get("/roles_cineasta");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(rolesCineasta);
    });
    
    test("Obtener todos los roles de cineastas falla", async () => {
        rolesCineastaController.getRolesCineasta.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/roles_cineasta");
        expect(response.status).toBe(500);
    });
});

// TEST PARA EL ENDPOINT Get cineastas de un rol
describe("GET /roles_cineasta/cineastas_por_rol/:id - obtener los cineastas de un rol", () => {
    test("Obtener los cineastas de un rol exitosamente", async () => {
        const mockCineastasPorRol = rolesCineasta.filter(rc => rc.id_rol === 2); 
        rolesCineastaController.getCineastasPorRol.mockImplementationOnce((req, res) => {
            res.json(mockCineastasPorRol);
        });

        const response = await request(app).get("/roles_cineasta/cineastas_por_rol/2");
        expect(response.status).toBe(200); 
        expect(response.body).toEqual(mockCineastasPorRol);
    });

    test("Obtener los cineastas de un rol falla", async () => {
        rolesCineastaController.getCineastasPorRol.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });

        const response = await request(app).get("/roles_cineasta/cineastas_por_rol/2");
        expect(response.status).toBe(500);
    });

    test("No se encontraron cineastas para el rol", async () => {
        rolesCineastaController.getCineastasPorRol.mockImplementationOnce((req, res) => {
            res.status(404).send("No se encontraron cineastas para el rol");
        });

        const response = await request(app).get("/roles_cineasta/cineastas_por_rol/5");
        expect(response.status).toBe(404);
        expect(response.text).toBe("No se encontraron cineastas para el rol");
    });
});

// TEST PARA EL ENDPOINT Get roles de un cineasta
describe("GET /roles_cineasta/roles_de_cineasta/:id - obtener los roles de un cineasta", () => {
    test("Obtener los roles de un cineasta exitosamente", async () => {
        const mockRolesPorCineasta = rolesCineasta.filter(rc => rc.id_cineasta === 1); 
        rolesCineastaController.getRolesDeCineasta.mockImplementationOnce((req, res) => {
            res.json(mockRolesPorCineasta);
        });

        const response = await request(app).get("/roles_cineasta/roles_de_cineasta/1");
        expect(response.status).toBe(200); 
        expect(response.body).toEqual(mockRolesPorCineasta);
    });

    test("Obtener los roles de un cineasta falla", async () => {
        rolesCineastaController.getRolesDeCineasta.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });

        const response = await request(app).get("/roles_cineasta/roles_de_cineasta/1");
        expect(response.status).toBe(500);
    });

    test("No se encontraron roles para el cineasta", async () => {
        rolesCineastaController.getRolesDeCineasta.mockImplementationOnce((req, res) => {
            res.status(404).send("No se encontraron roles para el cineasta");
        });

        const response = await request(app).get("/roles_cineasta/roles_de_cineasta/5");
        expect(response.status).toBe(404);
        expect(response.text).toBe("No se encontraron roles para el cineasta");
    });
});

// TEST PARA EL ENDPOINT Get de un rol de cineasta
describe("GET /roles_cineasta/:id_cineasta/:id_rol - obtener un rol de cineasta", () => {
    test("Obtener un rol de cineasta exitosamente", async () => {
        rolesCineastaController.getRolDeCineasta.mockImplementationOnce((req, res) => {
            res.json(rolesCineasta[0]);
        });
        const response = await request(app).get("/roles_cineasta/1/1");
        expect(response.status).toBe(200); 
        expect(response.body).toEqual(rolesCineasta[0]);
    });

    test("Error al obtener rol de cineasta", async () => {
        rolesCineastaController.getRolDeCineasta.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/roles_cineasta/1/1");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });

    test("Rol de cineasta no encontrado", async () => {
        rolesCineastaController.getRolDeCineasta.mockImplementationOnce((req, res) => {
            res.status(404).send("Rol de cineasta no encontrado");
        });
        const response = await request(app).get("/roles_cineasta/5/10");
        expect(response.status).toBe(404);
        expect(response.text).toBe("Rol de cineasta no encontrado");
    });
});

// TEST PARA EL ENDPOINT Create
describe("POST /roles_cineasta - crear un rol de cineasta", () => {
    test("Crear un rol de cineasta exitosamente", async () => {
        rolesCineastaController.createRolCineasta.mockImplementationOnce((req, res) => {
            res.status(201).json(rolesCineasta[0]);
        });
        const response = await request(app).post("/roles_cineasta").send(rolesCineasta[0]);
        expect(response.status).toBe(201); 
        expect(response.body).toEqual(rolesCineasta[0]);
    });

    test("Crear un rol de cineasta falla", async () => {
        rolesCineastaController.createRolCineasta.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).post("/roles_cineasta").send(rolesCineasta[0]);
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

// TEST PARA EL ENDPOINT Delete
describe("DELETE /roles_cineasta/:id_cineasta/:id_rol - eliminar un rol de cineasta", () => {
    test("Eliminar un rol de cineasta exitosamente", async () => {
        rolesCineastaController.deleteRolCineasta.mockImplementationOnce((req, res) => {
            res.status(200).send("Rol de cineasta eliminado");
        });
        const response = await request(app).delete("/roles_cineasta/1/1");
        expect(response.status).toBe(200); 
        expect(response.text).toBe("Rol de cineasta eliminado");
    });

    test("Eliminar un rol de cineasta falla", async () => {
        rolesCineastaController.deleteRolCineasta.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).delete("/roles_cineasta/1/1");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});
