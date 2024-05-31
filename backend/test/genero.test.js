import request from "supertest";
import app from "../src/app";
import * as generoController from "../controllers/generoController";

jest.mock("../controllers/generoController");

const generos = [
  { id: 1, nombre: "Acción" },
  { id: 2, nombre: "Comedia" },
  { id: 3, nombre: "Drama" },
  { id: 4, nombre: "Terror" },
];

// Mockear la función generoController.getGeneros
beforeEach(() => {
  generoController.getGeneros.mockImplementation((req, res) => {
    res.json(generos);
  });
});

describe("GET /generos - Obtener todos los géneros", () => {
  test("Obtener todos los géneros exitosamente", async () => {
    const response = await request(app).get("/generos");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(generos);
  });

  test("Error al obtener todos los géneros", async () => {
    generoController.getGeneros.mockImplementationOnce((req, res) => {
      res.status(500).send("Error");
    });
    const response = await request(app).get("/generos");
    expect(response.status).toBe(500);
    expect(response.text).toBe("Error");
  });
});

describe("GET /generos/:id - Obtener género por ID", () => {
  test("Obtener género por ID exitosamente", async () => {
    generoController.getGeneroById.mockImplementationOnce((req, res) => {
      res.json(generos[0]);
    });
    const response = await request(app).get("/generos/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(generos[0]);
  });

  test("Error al obtener género por ID", async () => {
    generoController.getGeneroById.mockImplementationOnce((req, res) => {
      res.status(500).send("Error");
    });
    const response = await request(app).get("/generos/1");
    expect(response.status).toBe(500);
    expect(response.text).toBe("Error");
  });

  test("Género no encontrado", async () => {
    generoController.getGeneroById.mockImplementationOnce((req, res) => {
      res.status(404).send("Género no encontrado");
    });
    const response = await request(app).get("/generos/1");
    expect(response.status).toBe(404);
    expect(response.text).toBe("Género no encontrado");
  });
});

describe("POST /generos - Crear género", () => {
  test("Crear género exitosamente", async () => {
    generoController.createGenero.mockImplementationOnce((req, res) => {
      res.json(generos[0]);
    });
    const response = await request(app).post("/generos").send(generos[0]);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(generos[0]);
  });

  test("Error al crear género", async () => {
    generoController.createGenero.mockImplementationOnce((req, res) => {
      res.status(500).send("Error");
    });
    const response = await request(app).post("/generos").send(generos[0]);
    expect(response.status).toBe(500);
    expect(response.text).toBe("Error");
  });
});

describe("PUT /generos/:id - Actualizar género", () => {
  test("Actualizar género exitosamente", async () => {
    generoController.updateGenero.mockImplementationOnce((req, res) => {
      res.json(generos[0]);
    });
    const response = await request(app).put("/generos/1").send(generos[0]);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(generos[0]);
  });

  test("Error al actualizar género", async () => {
    generoController.updateGenero.mockImplementationOnce((req, res) => {
      res.status(500).send("Error");
    });
    const response = await request(app).put("/generos/1").send(generos[0]);
    expect(response.status).toBe(500);
    expect(response.text).toBe("Error");
  });

  test("Género no encontrado", async () => {
    generoController.updateGenero.mockImplementationOnce((req, res) => {
      res.status(404).send("Género no encontrado");
    });
    const response = await request(app).put("/generos/1").send(generos[0]);
    expect(response.status).toBe(404);
    expect(response.text).toBe("Género no encontrado");
  });
});

describe("DELETE /generos/:id - Eliminar género", () => {
  test("Eliminar género exitosamente", async () => {
    generoController.deleteGenero.mockImplementationOnce((req, res) => {
      res.json(generos[0]);
    });
    const response = await request(app).delete("/generos/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(generos[0]);
  });

  test("Error al eliminar género", async () => {
    generoController.deleteGenero.mockImplementationOnce((req, res) => {
      res.status(500).send("Error");
    });
    const response = await request(app).delete("/generos/1");
    expect(response.status).toBe(500);
    expect(response.text).toBe("Error");
  });

  test("Género no encontrado", async () => {
    generoController.deleteGenero.mockImplementationOnce((req, res) => {
      res.status(404).send("Género no encontrado");
    });
    const response = await request(app).delete("/generos/1");
    expect(response.status).toBe(404);
    expect(response.text).toBe("Género no encontrado");
  });
});
