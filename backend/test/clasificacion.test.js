import request from "supertest";
import app from "../src/app";
import * as clasificacionController from "../controllers/clasificacionController";

jest.mock("../controllers/clasificacionController");

const clasificaciones = [
  { id: 1, nombre: "G", descripcion: "Todo público" },
  { id: 2, nombre: "PG", descripcion: "Guía parental sugerida" },
  { id: 3, nombre: "PG-13", descripcion: "No apto para menores de 13 años" },
  { id: 4, nombre: "R", descripcion: "Restringido" },
];

// Mockear la función clasificacionController.getClasificaciones
beforeEach(() => {
  clasificacionController.getClasificaciones.mockImplementation((req, res) => {
    res.json(clasificaciones);
  });
});

describe("GET /clasificaciones - Obtener todas las clasificaciones", () => {
  test("Obtener todas las clasificaciones exitosamente", async () => {
    const response = await request(app).get("/clasificaciones");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(clasificaciones);
  });

  test("Error al obtener todas las clasificaciones", async () => {
    clasificacionController.getClasificaciones.mockImplementationOnce(
      (req, res) => {
        res.status(500).send("Error");
      }
    );
    const response = await request(app).get("/clasificaciones");
    expect(response.status).toBe(500);
    expect(response.text).toBe("Error");
  });
});

describe("GET /clasificaciones/:id - Obtener clasificación por ID", () => {
  test("Obtener clasificación por ID exitosamente", async () => {
    clasificacionController.getClasificacionById.mockImplementationOnce(
      (req, res) => {
        res.json(clasificaciones[0]);
      }
    );
    const response = await request(app).get("/clasificaciones/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(clasificaciones[0]);
  });

  test("Error al obtener clasificación por ID", async () => {
    clasificacionController.getClasificacionById.mockImplementationOnce(
      (req, res) => {
        res.status(500).send("Error");
      }
    );
    const response = await request(app).get("/clasificaciones/1");
    expect(response.status).toBe(500);
    expect(response.text).toBe("Error");
  });

  test("Clasificación no encontrada", async () => {
    clasificacionController.getClasificacionById.mockImplementationOnce(
      (req, res) => {
        res.status(404).send("Clasificación no encontrada");
      }
    );
    const response = await request(app).get("/clasificaciones/100");
    expect(response.status).toBe(404);
    expect(response.text).toBe("Clasificación no encontrada");
  });
});

describe("POST /clasificaciones - Crear clasificación", () => {
  test("Crear clasificación exitosamente", async () => {
    clasificacionController.createClasificacion.mockImplementationOnce(
      (req, res) => {
        res.json(clasificaciones[0]);
      }
    );
    const response = await request(app)
      .post("/clasificaciones")
      .send(clasificaciones[0]);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(clasificaciones[0]);
  });

  test("Error al crear clasificación", async () => {
    clasificacionController.createClasificacion.mockImplementationOnce(
      (req, res) => {
        res.status(500).send("Error");
      }
    );
    const response = await request(app)
      .post("/clasificaciones")
      .send(clasificaciones[0]);
    expect(response.status).toBe(500);
    expect(response.text).toBe("Error");
  });

  test("Clasificación ya existe", async () => {
    clasificacionController.createClasificacion.mockImplementationOnce(
      (req, res) => {
        res.status(400).send("Clasificación ya existe");
      }
    );
    const response = await request(app)
      .post("/clasificaciones")
      .send(clasificaciones[0]);
    expect(response.status).toBe(400);
    expect(response.text).toBe("Clasificación ya existe");
  });
});

describe("PUT /clasificaciones/:id - Actualizar clasificación", () => {
  test("Actualizar clasificación exitosamente", async () => {
    clasificacionController.updateClasificacion.mockImplementationOnce(
      (req, res) => {
        res.json(clasificaciones[0]);
      }
    );
    const response = await request(app)
      .put("/clasificaciones/1")
      .send(clasificaciones[0]);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(clasificaciones[0]);
  });

  test("Error al actualizar clasificación", async () => {
    clasificacionController.updateClasificacion.mockImplementationOnce(
      (req, res) => {
        res.status(500).send("Error");
      }
    );
    const response = await request(app)
      .put("/clasificaciones/1")
      .send(clasificaciones[0]);
    expect(response.status).toBe(500);
    expect(response.text).toBe("Error");
  });

  test("Clasificación no encontrada", async () => {
    clasificacionController.updateClasificacion.mockImplementationOnce(
      (req, res) => {
        res.status(404).send("Clasificación no encontrada");
      }
    );
    const response = await request(app)
      .put("/clasificaciones/100")
      .send(clasificaciones[0]);
    expect(response.status).toBe(404);
    expect(response.text).toBe("Clasificación no encontrada");
  });
});

describe("DELETE /clasificaciones/:id - Eliminar clasificación", () => {
  test("Eliminar clasificación exitosamente", async () => {
    clasificacionController.deleteClasificacion.mockImplementationOnce(
      (req, res) => {
        res.json(clasificaciones[0]);
      }
    );
    const response = await request(app).delete("/clasificaciones/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(clasificaciones[0]);
  });

  test("Error al eliminar clasificación", async () => {
    clasificacionController.deleteClasificacion.mockImplementationOnce(
      (req, res) => {
        res.status(500).send("Error");
      }
    );
    const response = await request(app).delete("/clasificaciones/1");
    expect(response.status).toBe(500);
    expect(response.text).toBe("Error");
  });

  test("Clasificación no encontrada", async () => {
    clasificacionController.deleteClasificacion.mockImplementationOnce(
      (req, res) => {
        res.status(404).send("Clasificación no encontrada");
      }
    );
    const response = await request(app).delete("/clasificaciones/100");
    expect(response.status).toBe(404);
    expect(response.text).toBe("Clasificación no encontrada");
  });
});
