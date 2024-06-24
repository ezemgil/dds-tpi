import request from "supertest";
import app from "../src/app.js";
import * as tipo_traduccionController from "../controllers/tipo_traduccionController.js";
import * as rolesCineastaService from "../services/rolesCineastaService.js";
import { NotFoundError } from "../utils/errors.js";

jest.mock("../controllers/tipo_traduccionController.js");
jest.mock("../services/rolesCineastaService.js");

const tipos_traduccion = [
  { id: 1, nombre: "Subtitulado" },
  { id: 2, nombre: "Doblado" },
  { id: 3, nombre: "Doblado con sincronizacion labial" },
  { id: 4, nombre: "Voice-over" },
];

const cineastas_roles = [
  { id: 1, nombre: "Director" },
  { id: 2, nombre: "Guionista" },
  { id: 3, nombre: "Productor" },
];

// Mockear la funcion tipoTraduccionController.getTipoTraducciones
beforeEach(() => {
  tipo_traduccionController.getTiposTraduccion.mockImplementation(
    (req, res) => {
      res.json(tipos_traduccion);
    }
  );
});

// Mockear la funcion rolesCineastaService.getRolesCineasta
beforeEach(() => {
  rolesCineastaService.getRolesCineasta.mockImplementation((req, res) => {
    res.json(cineastas_roles);
  });
});

describe("GET /tipos_traduccion - Obtener todos los tipos de traducciones", () => {
  test("Obtener todos los tipos de traduccion exitosamente", async () => {
    const response = await request(app).get("/tipos_traduccion");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(tipos_traduccion);
  });

  test("Error al obtener todos los tipos de traduccion", async () => {
    tipo_traduccionController.getTiposTraduccion.mockImplementationOnce(
      (req, res) => {
        res.status(500).send("Error");
      }
    );
    const response = await request(app).get("/tipos_traduccion");
    expect(response.status).toBe(500);
    expect(response.text).toBe("Error");
  });
});

describe("GET /roles_cineasta - Obtener todos los roles de cineasta", () => {
  test("Obtener todos los roles de cineasta exitosamente", async () => {
    const response = await request(app).get("/roles_cineasta");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(cineastas_roles);
  });
});

describe("GET /roles_cineasta/:id - Obtener roles de cineasta por ID", () => {
  test("Obtener roles de cineasta por ID exitosamente", async () => {
    rolesCineastaService.getRolesPorCineasta.mockImplementationOnce(
      (req, res) => {
        res.json(cineastas_roles[0]);
      }
    );
    const response = await request(app).get("/roles_cineasta/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(cineastas_roles[0]);
  });
  test("Rol de cineasta no encontrado", async () => {
    rolesCineastaService.getRolesPorCineasta.mockImplementationOnce(
      (req, res) => {
        res.status(404).send("Rol de cineasta no encontrado");
      }
    );
    const response = await request(app).get("/roles_cineasta/1");
    expect(response.status).toBe(404);
    expect(response.text).toBe("Rol de cineasta no encontrado");
  });
});

describe("GET /cineastas_por_rol/:id - Obtener cineastas por rol", () => {
  test("Obtener cineastas por rol exitosamente", async () => {
    rolesCineastaService.getCineastasPorRol.mockImplementationOnce(
      (req, res) => {
        res.json(cineastas_roles[0]);
      }
    );
    const response = await request(app).get("/cineastas_por_rol/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(cineastas_roles[0]);
  });
});

describe("GET /rol_de_cineasta/:id_cineasta/:id_rol - Obtener rol de cineasta por ID de cineasta y rol", () => {
  test("Obtener rol de cineasta por ID de cineasta y rol exitosamente", async () => {
    rolesCineastaService.getRolDeCineasta.mockImplementationOnce((req, res) => {
      res.json(cineastas_roles[0]);
    });
    const response = await request(app).get("/rol_de_cineasta/1/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(cineastas_roles[0]);
  });
  test("Rol de cineasta no encontrado", async () => {
    rolesCineastaService.getRolDeCineasta.mockImplementationOnce((req, res) => {
      res.status(404).send("Rol de cineasta no encontrado");
    });
    const response = await request(app).get("/rol_de_cineasta/1/1");
    expect(response.status).toBe(404);
    expect(response.text).toBe("Rol de cineasta no encontrado");
  });
});

describe("POST /tipos_traduccion - Crear un tipo de traducción", () => {
  test("Crear tipo de traducción exitosamente", async () => {
    tipo_traduccionController.createTipoTraduccion.mockImplementationOnce(
      (req, res) => {
        res.json(tipos_traduccion[0]);
      }
    );
    const response = await request(app)
      .post("/tipos_traduccion")
      .send(tipos_traduccion[0]);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(tipos_traduccion[0]);
  });
  test("Error al crear tipo de traducción", async () => {
    tipo_traduccionController.createTipoTraduccion.mockImplementationOnce(
      (req, res) => {
        res.status(500).send("Error");
      }
    );
    const response = await request(app)
      .post("/tipos_traduccion")
      .send(tipos_traduccion[0]);
    expect(response.status).toBe(500);
    expect(response.text).toBe("Error");
  });
});

describe("POST /roles_cineasta - Crear un rol de cineasta", () => {
  test("Crear rol de cineasta exitosamente", async () => {
    rolesCineastaService.createRolCineasta.mockImplementationOnce(
      (req, res) => {
        res.json(cineastas_roles[0]);
      }
    );
    const response = await request(app)
      .post("/roles_cineasta")
      .send(cineastas_roles[0]);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(cineastas_roles[0]);
  });
  test("Error al crear rol de cineasta", async () => {
    rolesCineastaService.createRolCineasta.mockImplementationOnce(
      (req, res) => {
        res.status(500).send("Error");
      }
    );
    const response = await request(app)
      .post("/roles_cineasta")
      .send(cineastas_roles[0]);
    expect(response.status).toBe(500);
    expect(response.text).toBe("Error");
  });
});

describe("DELETE /roles_cineasta/:id_cineasta/:id_rol - Eliminar un rol de cineasta", () => {
  test("Eliminar rol de cineasta exitosamente", async () => {
    rolesCineastaService.deleteRolCineasta.mockImplementationOnce(
      (req, res) => {
        res.json(cineastas_roles[0]);
      }
    );
    const response = await request(app).delete("/roles_cineasta/1/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(cineastas_roles[0]);
  });
  test("Error al eliminar rol de cineasta", async () => {
    rolesCineastaService.deleteRolCineasta.mockImplementationOnce(
      (req, res) => {
        res.status(500).send("Error");
      }
    );
    const response = await request(app).delete("/roles_cineasta/1/1");
    expect(response.status).toBe(500);
    expect(response.text).toBe("Error");
  });
  test("Rol de cineasta no encontrado", async () => {
    rolesCineastaService.deleteRolCineasta.mockImplementationOnce(
      (req, res) => {
        res.status(404).send("Rol de cineasta no encontrado");
      }
    );
    const response = await request(app).delete("/roles_cineasta/1/1");
    expect(response.status).toBe(404);
    expect(response.text).toBe("Rol de cineasta no encontrado");
  });
});
