import request from "supertest";
import app from "../src/app";
import * as idiomaController from "../controllers/idiomaController";

jest.mock("../controllers/idiomaController");

const idiomas = [
  { id: 1, nombre: "Inglés" },
  { id: 2, nombre: "Español" },
  { id: 3, nombre: "Francés" },
  { id: 4, nombre: "Alemán" },
];

beforeEach(() => {
  idiomaController.getIdiomas.mockImplementation((req, res) => {
    res.json(idiomas);
  });
});

describe("GET /idiomas - Obtener todos los idiomas", () => {
  test("Obtener todos los idiomas exitosamente", async () => {
    const response = await request(app).get("/idiomas");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(idiomas);
  });

  test("Error al obtener todos los idiomas", async () => {
    idiomaController.getIdiomas.mockImplementationOnce((req, res) => {
      res.status(500).send("Error");
    });
    const response = await request(app).get("/idiomas");
    expect(response.status).toBe(500);
    expect(response.text).toBe("Error");
  });
});

describe("GET /idiomas/:id - Obtener idioma por ID", () => {
  test("Obtener idioma por ID exitosamente", async () => {
    idiomaController.getIdiomaById.mockImplementationOnce((req, res) => {
      res.json(idiomas[0]);
    });
    const response = await request(app).get("/idiomas/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(idiomas[0]);
  });

  test("Error al obtener idioma por ID", async () => {
    idiomaController.getIdiomaById.mockImplementationOnce((req, res) => {
      res.status(500).send("Error");
    });
    const response = await request(app).get("/idiomas/1");
    expect(response.status).toBe(500);
    expect(response.text).toBe("Error");
  });
});
/*
describe("POST /idiomas - Crear idioma", () => {
  test("Crear idioma exitosamente", async () => {
    idiomaController.createIdioma.mockImplementationOnce((req, res) => {
      res.json({ id: 5, nombre: "Italiano" });
    });
    const response = await request(app)
      .post("/idiomas")
      .send({ nombre: "Italiano" });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: 5, nombre: "Italiano" });
  });

  test("Error al crear idioma", async () => {
    idiomaController.createIdioma.mockImplementationOnce((req, res) => {
      res.status(500).send("Error");
    });
    const response = await request(app)
      .post("/idiomas")
      .send({ nombre: "Italiano" });
    expect(response.status).toBe(500);
    expect(response.text).toBe("Error");
  });

  test("Falta el nombre del idioma", async () => {
    const response = await request(app).post("/idiomas");
    expect(response.status).toBe(400);
    expect(response.text).toBe("Falta el nombre del idioma");
  });
});

describe("PUT /idiomas/:id - Actualizar idioma", () => {
  test("Actualizar idioma exitosamente", async () => {
    idiomaController.updateIdioma.mockImplementationOnce((req, res) => {
      res.json({ id: 1, nombre: "Italiano" });
    });
    const response = await request(app)
      .put("/idiomas/1")
      .send({ nombre: "Italiano" });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, nombre: "Italiano" });
  });

  test("Error al actualizar idioma", async () => {
    idiomaController.updateIdioma.mockImplementationOnce((req, res) => {
      res.status(500).send("Error");
    });
    const response = await request(app)
      .put("/idiomas/1")
      .send({ nombre: "Italiano" });
    expect(response.status).toBe(500);
    expect(response.text).toBe("Error");
  });

  test("Falta el nombre del idioma", async () => {
    const response = await request(app).put("/idiomas/1");
    expect(response.status).toBe(400);
    expect(response.text).toBe("Falta el nombre del idioma");
  });
});


describe("DELETE /idiomas/:id - Eliminar idioma", () => {
  test("Eliminar idioma exitosamente", async () => {
    idiomaController.deleteIdioma.mockImplementationOnce((req, res) => {
      res.json(idiomas[0]);
    });
    const response = await request(app).delete("/idiomas/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(idiomas[0]);
  });

  test("Error al eliminar idioma", async () => {
    idiomaController.deleteIdioma.mockImplementationOnce((req, res) => {
      res.status(500).send("Error");
    });
    const response = await request(app).delete("/idiomas/1");
    expect(response.status).toBe(500);
    expect(response.text).toBe("Error");
  });
});
*/
