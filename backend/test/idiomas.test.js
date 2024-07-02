import request from "supertest";
import app from "../src/app.js";
import * as idiomaController from "../src/controllers/idioma.controller.js";

jest.mock("../src/controllers/idioma.controller.js");
jest.mock("../src/middleware/auth.js", () => {
    return {
        authentificateJWT: (req, res, next) => {
            next();
        },
    };
});

const idiomas = [
    { id: 1, nombre: "English" },
    { id: 2, nombre: "Spanish" },
    { id: 3, nombre: "French" },
    { id: 4, nombre: "German" },
];

// Mock the idiomaController.getIdiomas function
beforeEach(() => {
    idiomaController.getIdiomas.mockImplementation((req, res) => {
        res.json(idiomas);
    });
});

describe("GET /api/idiomas - Obtener todos los idiomas", () => {
    test("Se obtuvieron todos los idiomas exitosamente", async () => {
        const response = await request(app).get("/api/idiomas");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(idiomas);
    });

    test("Error al obtener todos los idiomas", async () => {
        idiomaController.getIdiomas.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/api/idiomas");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

describe("GET /api/idiomas/:id - Obtener idioma por ID", () => {
    test("Se obtuvo el idioma por ID exitosamente", async () => {
        idiomaController.getIdiomaById.mockImplementationOnce((req, res) => {
            res.json(idiomas[0]);
        });
        const response = await request(app).get("/api/idiomas/1");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(idiomas[0]);
    });

    test("Error al obtener idioma por ID", async () => {
        idiomaController.getIdiomaById.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/api/idiomas/1");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });

    test("Idioma no encontrado", async () => {
        idiomaController.getIdiomaById.mockImplementationOnce((req, res) => {
            res.status(404).send("Language not found");
        });
        const response = await request(app).get("/api/idiomas/1");
        expect(response.status).toBe(404);
        expect(response.text).toBe("Language not found");
    });
});

describe("POST /api/idiomas - Crear un idioma", () => {
    test("Se creo un idioma exitosamente", async () => {
        idiomaController.createIdioma.mockImplementationOnce((req, res) => {
            res.json(idiomas[0]);
        });
        const response = await request(app)
            .post("/api/idiomas")
            .set("Authorization", "Bearer your-access-token")
            .send(idiomas[0]);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(idiomas[0]);
    });

    test("Error al crear un idioma", async () => {
        idiomaController.createIdioma.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app)
            .post("/api/idiomas")
            .set("Authorization", "Bearer your-access-token")
            .send(idiomas[0]);
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

describe("PUT /api/idiomas/:id - Actualizar un idioma", () => {
    test("Se actualizo un idioma exitosamente", async () => {
        idiomaController.updateIdioma.mockImplementationOnce((req, res) => {
            res.json(idiomas[0]);
        });
        const response = await request(app)
            .put("/api/idiomas/1")
            .set("Authorization", "Bearer your-access-token")
            .send(idiomas[0]);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(idiomas[0]);
    });

    test("Error al actualizar un idioma", async () => {
        idiomaController.updateIdioma.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app)
            .put("/api/idiomas/1")
            .set("Authorization", "Bearer your-access-token")
            .send(idiomas[0]);
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });

    test("Idioma no encontrado", async () => {
        idiomaController.updateIdioma.mockImplementationOnce((req, res) => {
            res.status(404).send("Language not found");
        });
        const response = await request(app)
            .put("/api/idiomas/1")
            .set("Authorization", "Bearer your-access-token")
            .send(idiomas[0]);
        expect(response.status).toBe(404);
        expect(response.text).toBe("Language not found");
    });
});

describe("DELETE /api/idiomas/:id - Eliminar un idioma", () => {
    test("Se elimino un idioma exitosamente", async () => {
        idiomaController.deleteIdioma.mockImplementationOnce((req, res) => {
            res.json(idiomas[0]);
        });
        const response = await request(app).delete("/api/idiomas/1").set("Authorization", "Bearer your-access-token");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(idiomas[0]);
    });

    test("Error al eliminar un idioma", async () => {
        idiomaController.deleteIdioma.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).delete("/api/idiomas/1").set("Authorization", "Bearer your-access-token");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });

    test("Idioma no encontrado", async () => {
        idiomaController.deleteIdioma.mockImplementationOnce((req, res) => {
            res.status(404).send("Language not found");
        });
        const response = await request(app).delete("/api/idiomas/1").set("Authorization", "Bearer your-access-token");
        expect(response.status).toBe(404);
        expect(response.text).toBe("Language not found");
    });
});
