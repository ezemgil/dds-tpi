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

describe("GET /api/idiomas - Get all languages", () => {
    test("Successfully get all languages", async () => {
        const response = await request(app).get("/api/idiomas");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(idiomas);
    });

    test("Error while getting all languages", async () => {
        idiomaController.getIdiomas.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/api/idiomas");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });
});

describe("GET /api/idiomas/:id - Get language by ID", () => {
    test("Successfully get language by ID", async () => {
        idiomaController.getIdiomaById.mockImplementationOnce((req, res) => {
            res.json(idiomas[0]);
        });
        const response = await request(app).get("/api/idiomas/1");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(idiomas[0]);
    });

    test("Error while getting language by ID", async () => {
        idiomaController.getIdiomaById.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).get("/api/idiomas/1");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });

    test("Language not found", async () => {
        idiomaController.getIdiomaById.mockImplementationOnce((req, res) => {
            res.status(404).send("Language not found");
        });
        const response = await request(app).get("/api/idiomas/1");
        expect(response.status).toBe(404);
        expect(response.text).toBe("Language not found");
    });
});

describe("POST /api/idiomas - Create a language", () => {
    test("Successfully create a language", async () => {
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

    test("Error while creating a language", async () => {
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

describe("PUT /api/idiomas/:id - Update a language", () => {
    test("Successfully update a language", async () => {
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

    test("Error while updating a language", async () => {
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

    test("Language not found", async () => {
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

describe("DELETE /api/idiomas/:id - Delete a language", () => {
    test("Successfully delete a language", async () => {
        idiomaController.deleteIdioma.mockImplementationOnce((req, res) => {
            res.json(idiomas[0]);
        });
        const response = await request(app).delete("/api/idiomas/1").set("Authorization", "Bearer your-access-token");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(idiomas[0]);
    });

    test("Error while deleting a language", async () => {
        idiomaController.deleteIdioma.mockImplementationOnce((req, res) => {
            res.status(500).send("Error");
        });
        const response = await request(app).delete("/api/idiomas/1").set("Authorization", "Bearer your-access-token");
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error");
    });

    test("Language not found", async () => {
        idiomaController.deleteIdioma.mockImplementationOnce((req, res) => {
            res.status(404).send("Language not found");
        });
        const response = await request(app).delete("/api/idiomas/1").set("Authorization", "Bearer your-access-token");
        expect(response.status).toBe(404);
        expect(response.text).toBe("Language not found");
    });
});
