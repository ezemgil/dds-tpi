import request from "supertest";
import app from "../src/app.js";
import * as controller from "../src/controllers/premio.controller.js";

jest.mock("../src/controllers/premio.controller.js");
jest.mock("../src/middleware/auth.js", () => {
    return {
        authentificateJWT: (req, res, next) => {
            next();
        },
    };
});

describe("GET /api/premios - Obtener todos los premios", () => {
    test("Se obtuvieron todos los premios exitosamente", async () => {
        const premios = [
            { id: 1, nombre: "Premio 1" },
            { id: 2, nombre: "Premio 2" },
        ];
        controller.getPremios.mockImplementationOnce((req, res) => {
            res.json(premios);
        });
        const response = await request(app).get("/api/premios");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(premios);
    });

    test("Error mientras se obtenian todos los premios", async () => {
        controller.getPremios.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/api/premios");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

describe("GET /api/premios/:id - Obtener premio por ID", () => {
    test("Se obtuvo el premio por ID exitosamente", async () => {
        controller.getPremioById.mockImplementationOnce((req, res) => {
            res.json({ id: 1, nombre: "Premio 1" });
        });
        const response = await request(app).get("/api/premios/1");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 1, nombre: "Premio 1" });
    });

    test("Error mientras se obtenia el premio por ID", async () => {
        controller.getPremioById.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/api/premios/1");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });

    test("Premio no encontrado", async () => {
        controller.getPremioById.mockImplementationOnce((req, res) => {
            res.status(404).send("Premio not found");
        });
        const response = await request(app).get("/api/premios/1");
        expect(response.status).toBe(404);
        expect(response.text).toBe("Premio not found");
    });
});

describe("POST /api/premios - Crear un premio", () => {
    test("Se creo un premio exitosamente", async () => {
        controller.createPremio.mockImplementationOnce((req, res) => {
            res.json({ id: 1, nombre: "Premio 1" });
        });
        const response = await request(app)
            .post("/api/premios")
            .set("Authorization", "Bearer your-access-token")
            .send({ nombre: "Premio 1" });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 1, nombre: "Premio 1" });
    });

    test("Error mientras se creaba un premio", async () => {
        controller.createPremio.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app)
            .post("/api/premios")
            .set("Authorization", "Bearer your-access-token")
            .send({ nombre: "Premio 1" });
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

describe("PUT /api/premios/:id - Actualizar un premio", () => {
    test("Se actualizo el premio exitosamente", async () => {
        controller.updatePremio.mockImplementationOnce((req, res) => {
            res.json({ id: 1, nombre: "Premio 1" });
        });
        const response = await request(app)
            .put("/api/premios/1")
            .set("Authorization", "Bearer your-access-token")
            .send({ nombre: "Premio 1" });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 1, nombre: "Premio 1" });
    });

    test("Error mientras se actualizaba un premio", async () => {
        controller.updatePremio.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app)
            .put("/api/premios/1")
            .set("Authorization", "Bearer your-access-token")
            .send({ nombre: "Premio 1" });
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });

    test("Premio no encontrado", async () => {
        controller.updatePremio.mockImplementationOnce((req, res) => {
            res.status(404).send("Premio not found");
        });
        const response = await request(app)
            .put("/api/premios/1")
            .set("Authorization", "Bearer your-access-token")
            .send({ nombre: "Premio 1" });
        expect(response.status).toBe(404);
        expect(response.text).toBe("Premio not found");
    });
});

describe("DELETE /api/premios/:id - Eliminar un premio", () => {
    test("Se elimino un premio exitosamente", async () => {
        controller.deletePremio.mockImplementationOnce((req, res) => {
            res.json({ id: 1, nombre: "Premio 1" });
        });
        const response = await request(app).delete("/api/premios/1").set("Authorization", "Bearer your-access-token");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 1, nombre: "Premio 1" });
    });

    test("Error mientras se eliminaba un premio", async () => {
        controller.deletePremio.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).delete("/api/premios/1").set("Authorization", "Bearer your-access-token");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });

    test("Premio no encontrado", async () => {
        controller.deletePremio.mockImplementationOnce((req, res) => {
            res.status(404).send("Premio not found");
        });
        const response = await request(app).delete("/api/premios/1").set("Authorization", "Bearer your-access-token");
        expect(response.status).toBe(404);
        expect(response.text).toBe("Premio not found");
    });
});