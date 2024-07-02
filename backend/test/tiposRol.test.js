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

describe("GET /api/tipos_rol/buscar - Obtener tipoRol por name", () => {
    test("Se obtuvieron los tiposRol por nombre exitosamente", async () => {
        controller.getTipoRolByName.mockImplementationOnce((req, res) => {
            res.json({ id: 1, nombre: "Admin" });
        });
        const response = await request(app).get("/api/tipos_rol/buscar?nombre=Admin");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 1, nombre: "Admin" });
    });

    test("Error mientras se obtenia tiposRol por nombre", async () => {
        controller.getTipoRolByName.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/api/tipos_rol/buscar?nombre=Admin");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

describe("GET /api/tipos_rol - Obtener todos los tipos rol", () => {
    test("Se obtuvieron todos los tiposRol exitosamente", async () => {
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

    test("Error mientras se obtenian todos los tiposRol", async () => {
        controller.getTiposRol.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/api/tipos_rol");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

describe("GET /api/tipos_rol/:id - Obtener tipoRol por ID", () => {
    test("Se obtuvieron los tiposRol por ID exitosamente", async () => {
        controller.getTipoRolById.mockImplementationOnce((req, res) => {
            res.json({ id: 1, nombre: "Admin" });
        });
        const response = await request(app).get("/api/tipos_rol/1");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 1, nombre: "Admin" });
    });

    test("Error mientras se obtenian los tiposRol por ID", async () => {
        controller.getTipoRolById.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/api/tipos_rol/1");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });

    test("tipoRol no encontrado", async () => {
        controller.getTipoRolById.mockImplementationOnce((req, res) => {
            res.status(404).send("TipoRol not found");
        });
        const response = await request(app).get("/api/tipos_rol/1");
        expect(response.status).toBe(404);
        expect(response.text).toBe("TipoRol not found");
    });
});

describe("POST /api/tipos_rol - Crear un tipoRol", () => {
    test("Se creo un tipoRol exitosamente", async () => {
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

    test("Error mientras se creaba un tipoRol", async () => {
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

describe("PUT /api/tipos_rol/:id - Actualizar un tipoRol", () => {
    test("Se actualizo el tipoRol exitosamente", async () => {
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

    test("Error mientras se actualizaba un tipoRol", async () => {
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

    test("tipoRol no encontrado", async () => {
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

describe("DELETE /api/tipos_rol/:id - Eliminar un tipoRol", () => {
    test("Se elimino un tipoRol exitosamente", async () => {
        controller.deleteTipoRol.mockImplementationOnce((req, res) => {
            res.json({ id: 1, nombre: "Admin" });
        });
        const response = await request(app).delete("/api/tipos_rol/1").set("Authorization", "Bearer your-access-token");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 1, nombre: "Admin" });
    });

    test("Error mientras se eliminaba un tipoRol", async () => {
        controller.deleteTipoRol.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).delete("/api/tipos_rol/1").set("Authorization", "Bearer your-access-token");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });

    test("tipoRol no encontrado", async () => {
        controller.deleteTipoRol.mockImplementationOnce((req, res) => {
            res.status(404).send("TipoRol not found");
        });
        const response = await request(app).delete("/api/tipos_rol/1").set("Authorization", "Bearer your-access-token");
        expect(response.status).toBe(404);
        expect(response.text).toBe("TipoRol not found");
    });
});
