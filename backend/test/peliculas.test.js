import request from "supertest";
import app from "../src/app";
import * as peliculasController from "../controllers/peliculaController";

jest.mock("../controllers/peliculaController");

const peliculas = [
  {
    id: 1,
    titulo: "Sueño de fuga",
    sinopsis:
      "El banquero Andy Dufresne es arrestado por matar a su esposa y amante. Tras una dura adaptación, intenta mejorar las condiciones de la prisión y dar esperanza a sus compañeros.",
    calificacion: 9.3,
    duracion: 142,
    fechaEstreno: "1994-10-14",
    nombre: "The Shawshank Redemption",
    clasificacionId: 1,
  },
  {
    id: 2,
    titulo: "El padrino",
    sinopsis:
      "La familia mafiosa Corleone intenta establecer un imperio en la industria de la droga en Nueva York mientras lucha por mantener el control de su territorio.",
    calificacion: 9.2,
    duracion: 175,
    fechaEstreno: "1972-03-24",
    nombre: "The Godfather",
    clasificacionId: 4,
  },
  {
    id: 3,
    titulo: "El padrino: Parte II",
    sinopsis:
      "Michael Corleone expande su imperio de la mafia y se enfrenta a traiciones mientras intenta consolidar su poder y legado.",
    calificacion: 9.0,
    duracion: 202,
    fechaEstreno: "1974-12-20",
    nombre: "The Godfather: Part II",
    clasificacionId: 4,
  },
];

// Mockear la función peliculasController.getPeliculas
beforeEach(() => {
  peliculasController.getPeliculas.mockImplementation((req, res) => {
    res.json(peliculas);
  });
});

describe("GET /peliculas - Obtener todas las películas", () => {
  test("Obtener todas las películas exitosamente", async () => {
    const response = await request(app).get("/peliculas");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(peliculas);
  });

  test("Error al obtener todas las películas", async () => {
    peliculasController.getPeliculas.mockImplementationOnce((req, res) => {
      res.status(500).send("Error");
    });
    const response = await request(app).get("/peliculas");
    expect(response.status).toBe(500);
    expect(response.text).toBe("Error");
  });
});

describe("GET /peliculas/:id - Obtener película por ID", () => {
  test("Obtener película por ID exitosamente", async () => {
    peliculasController.getPeliculaById.mockImplementationOnce((req, res) => {
      res.json(peliculas[0]);
    });
    const response = await request(app).get("/peliculas/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(peliculas[0]);
  });

  test("Error al obtener película por ID", async () => {
    peliculasController.getPeliculaById.mockImplementationOnce((req, res) => {
      res.status(500).send("Error");
    });
    const response = await request(app).get("/peliculas/1");
    expect(response.status).toBe(500);
    expect(response.text).toBe("Error");
  });

  test("Película no encontrada", async () => {
    peliculasController.getPeliculaById.mockImplementationOnce((req, res) => {
      res.status(404).send("Película no encontrada");
    });
    const response = await request(app).get("/peliculas/1");
    expect(response.status).toBe(404);
    expect(response.text).toBe("Película no encontrada");
  });
});

describe("POST /peliculas - Crear película", () => {
  test("Crear película exitosamente", async () => {
    peliculasController.createPelicula.mockImplementationOnce((req, res) => {
      res.status(201).json(peliculas[0]);
    });
    const response = await request(app).post("/peliculas").send(peliculas[0]);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(peliculas[0]);
  });

  test("Error al crear película", async () => {
    peliculasController.createPelicula.mockImplementationOnce((req, res) => {
      res.status(500).send("Error");
    });
    const response = await request(app).post("/peliculas").send(peliculas[0]);
    expect(response.status).toBe(500);
    expect(response.text).toBe("Error");
  });
});

describe("PUT /peliculas/:id - Actualizar película", () => {
  test("Actualizar película exitosamente", async () => {
    peliculasController.updatePelicula.mockImplementationOnce((req, res) => {
      res.json(peliculas[0]);
    });
    const response = await request(app).put("/peliculas/1").send(peliculas[0]);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(peliculas[0]);
  });

  test("Error al actualizar película", async () => {
    peliculasController.updatePelicula.mockImplementationOnce((req, res) => {
      res.status(500).send("Error");
    });
    const response = await request(app).put("/peliculas/1").send(peliculas[0]);
    expect(response.status).toBe(500);
    expect(response.text).toBe("Error");
  });

  test("Película no encontrada al actualizar", async () => {
    peliculasController.updatePelicula.mockImplementationOnce((req, res) => {
      res.status(404).send("Película no encontrada");
    });
    const response = await request(app)
      .put("/peliculas/100")
      .send(peliculas[0]);
    expect(response.status).toBe(404);
    expect(response.text).toBe("Película no encontrada");
  });
});

describe("DELETE /peliculas/:id - Eliminar película", () => {
  test("Eliminar película exitosamente", async () => {
    peliculasController.deletePelicula.mockImplementationOnce((req, res) => {
      res.status(204).send();
    });
    const response = await request(app).delete("/peliculas/1");
    expect(response.status).toBe(204);
    expect(response.text).toBe("");
  });

  test("Error al eliminar película", async () => {
    peliculasController.deletePelicula.mockImplementationOnce((req, res) => {
      res.status(500).send("Error");
    });
    const response = await request(app).delete("/peliculas/1");
    expect(response.status).toBe(500);
    expect(response.text).toBe("Error");
  });

  test("Película no encontrada al eliminar", async () => {
    peliculasController.deletePelicula.mockImplementationOnce((req, res) => {
      res.status(404).send("Película no encontrada");
    });
    const response = await request(app).delete("/peliculas/100");
    expect(response.status).toBe(404);
    expect(response.text).toBe("Película no encontrada");
  });
});
