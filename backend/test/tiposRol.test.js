import request from "supertest";
import app from "../src/app.js";
import * as controller from "../src/controllers/tipoRol.controller.js";

jest.mock("../src/controllers/tipoRol.controller.js");
jest.mock("../src/middleware/auth.js", () => {
    return {
        authentificateJWT: (req, res, next) => {
            next();
        },
    };
});

describe("GET /api/tipos_rol/buscar - Get tipoRol by name", () => {
    test("Successfully get tipoRol by name", async () => {
        controller.getTipoRolByName.mockImplementationOnce((req, res) => {
            res.json({ id: 1, nombre: "Admin" });
        });
        const response = await request(app).get("/api/tipos_rol/buscar?nombre=Admin");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 1, nombre: "Admin" });
    });

    test("Error while getting tipoRol by name", async () => {
        controller.getTipoRolByName.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/api/tipos_rol/buscar?nombre=Admin");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

describe("GET /api/tipos_rol - Get all tiposRol", () => {
    test("Successfully get all tiposRol", async () => {
        const tiposRol = [
            { id: 1, nombre: "Admin" },
            { id: 2, nombre: "User" },
        ];
        controller.getTiposRol.mockImplementationOnce((req, res) => {
            res.json(tiposRol);
        });
        const response = await request(app).get("/api/tipos_rol");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(tiposRol);
    });

    test("Error while getting all tiposRol", async () => {
        controller.getTiposRol.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/api/tipos_rol");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

describe("GET /api/tipos_rol/:id - Get tipoRol by ID", () => {
    test("Successfully get tipoRol by ID", async () => {
        controller.getTipoRolById.mockImplementationOnce((req, res) => {
            res.json({ id: 1, nombre: "Admin" });
        });
        const response = await request(app).get("/api/tipos_rol/1");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 1, nombre: "Admin" });
    });

    test("Error while getting tipoRol by ID", async () => {
        controller.getTipoRolById.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/api/tipos_rol/1");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });

    test("TipoRol not found", async () => {
        controller.getTipoRolById.mockImplementationOnce((req, res) => {
            res.status(404).send("TipoRol not found");
        });
        const response = await request(app).get("/api/tipos_rol/1");
        expect(response.status).toBe(404);
        expect(response.text).toBe("TipoRol not found");
    });
});

describe("POST /api/tipos_rol - Create a tipoRol", () => {
    test("Successfully create a tipoRol", async () => {
        controller.createTipoRol.mockImplementationOnce((req, res) => {
            res.json({ id: 1, nombre: "Admin" });
        });
        const response = await request(app)
            .post("/api/tipos_rol")
            .set("Authorization", "Bearer your-access-token")
            .send({ nombre: "Admin" });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 1, nombre: "Admin" });
    });

    test("Error while creating a tipoRol", async () => {
        controller.createTipoRol.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app)
            .post("/api/tipos_rol")
            .set("Authorization", "Bearer your-access-token")
            .send({ nombre: "Admin" });
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

describe("PUT /api/tipos_rol/:id - Update a tipoRol", () => {
    test("Successfully update a tipoRol", async () => {
        controller.updateTipoRol.mockImplementationOnce((req, res) => {
            res.json({ id: 1, nombre: "Admin" });
        });
        const response = await request(app)
            .put("/api/tipos_rol/1")
            .set("Authorization", "Bearer your-access-token")
            .send({ nombre: "Admin" });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 1, nombre: "Admin" });
    });

    test("Error while updating a tipoRol", async () => {
        controller.updateTipoRol.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app)
            .put("/api/tipos_rol/1")
            .set("Authorization", "Bearer your-access-token")
            .send({ nombre: "Admin" });
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });

    test("TipoRol not found", async () => {
        controller.updateTipoRol.mockImplementationOnce((req, res) => {
            res.status(404).send("TipoRol not found");
        });
        const response = await request(app)
            .put("/api/tipos_rol/1")
            .set("Authorization", "Bearer your-access-token")
            .send({ nombre: "Admin" });
        expect(response.status).toBe(404);
        expect(response.text).toBe("TipoRol not found");
    });
});

describe("DELETE /api/tipos_rol/:id - Delete a tipoRol", () => {
    test("Successfully delete a tipoRol", async () => {
        controller.deleteTipoRol.mockImplementationOnce((req, res) => {
            res.json({ id: 1, nombre: "Admin" });
        });
        const response = await request(app).delete("/api/tipos_rol/1").set("Authorization", "Bearer your-access-token");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 1, nombre: "Admin" });
    });

    test("Error while deleting a tipoRol", async () => {
        controller.deleteTipoRol.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).delete("/api/tipos_rol/1").set("Authorization", "Bearer your-access-token");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });

    test("TipoRol not found", async () => {
        controller.deleteTipoRol.mockImplementationOnce((req, res) => {
            res.status(404).send("TipoRol not found");
        });
        const response = await request(app).delete("/api/tipos_rol/1").set("Authorization", "Bearer your-access-token");
        expect(response.status).toBe(404);
        expect(response.text).toBe("TipoRol not found");
    });
});
