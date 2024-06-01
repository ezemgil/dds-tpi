import request from "supertest";
import * as rolesCineastaController from "../controllers/rolesCineastaController.js";
import app from "../src/app.js";

jest.mock("../controllers/rolesCineastaController");

const rolesCineasta = [
    {
        "id_cineasta": 1,
        "id_rol": 1,
    },
    {
        "id_cineasta": 1,
        "id_rol": 2,
    },
    {
        "id_cineasta": 2,
        "id_rol": 2,
    },
    {
        "id_cineasta": 3,
        "id_rol": 4,
    }

]

// Mockear la funcion rolesCineastaController.getRolesCineasta
beforeEach(() => {
    rolesCineastaController.getRolesCineasta.mockImplementation((req, res) => {
        res.json(rolesCineasta);
    });
});

// TEST PARA EL ENDPOINT Get all
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



