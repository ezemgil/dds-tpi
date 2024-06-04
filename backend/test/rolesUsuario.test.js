import request from "supertest";
import app from "../src/app.js";
import * as rolesUsuarioController from "../controllers/roles_usuarioController.js";

jest.mock("../controllers/roles_usuarioController.js");

const rolesUsuario = [
  { id: 1, nombre: "Rol 1" },
  { id: 2, nombre: "Rol 2" },
  { id: 3, nombre: "Rol 3" },
  { id: 4, nombre: "Rol 4" },
];

beforeEach(() => {
  rolesUsuarioController.getRoles.mockImplementation((req, res) => {
    res.json(rolesUsuario);
  });
});

describe("GET /roles - Obtener todos los roles", () => {
  test("Obtener todos los roles exitosamente", async () => {
    const response = await request(app).get("/roles");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(rolesUsuario);
  });

  test("Error al obtener todos los roles", async () => {
    rolesUsuarioController.getRoles.mockImplementationOnce((req, res) => {
      res.status(500).send("Error");
    });
    const response = await request(app).get("/roles");
    expect(response.status).toBe(500);
    expect(response.text).toBe("Error");
  });
});

describe("GET /roles/buscar - Obtener rol por nombre", () => {
  test("Obtener rol por nombre exitosamente", async () => {
    rolesUsuarioController.getRolByName.mockImplementationOnce((req, res) => {
      res.json(rolesUsuario[0]);
    });
    const response = await request(app).get("/roles/buscar?nombre=Rol 1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(rolesUsuario[0]);
  });

  test("Error al obtener rol por nombre", async () => {
    rolesUsuarioController.getRolByName.mockImplementationOnce((req, res) => {
      res.status(500).send("Error");
    });
    const response = await request(app).get("/roles/buscar?nombre=Rol 1");
    expect(response.status).toBe(500);
    expect(response.text).toBe("Error");
  });
});

describe("POST /roles - Crear rol", () => {
  test("Crear rol exitosamente", async () => {
    rolesUsuarioController.createRol.mockImplementationOnce((req, res) => {
      res.status(201).json({ nombre: "Rol 5" });
    });
    const response = await request(app)
      .post("/roles")
      .send({ nombre: "Rol 5" });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ nombre: "Rol 5" });
  });

  test("Error al crear rol", async () => {
    rolesUsuarioController.createRol.mockImplementationOnce((req, res) => {
      res.status(500).send("Error");
    });
    const response = await request(app)
      .post("/roles")
      .send({ nombre: "Rol 5" });
    expect(response.status).toBe(500);
    expect(response.text).toBe("Error");
  });
});

describe("PUT /roles/:id - Actualizar rol", () => {
  test("Actualizar rol exitosamente", async () => {
    rolesUsuarioController.updateRol.mockImplementationOnce((req, res) => {
      res.json({ id: 1, nombre: "Rol 1" });
    });
    const response = await request(app)
      .put("/roles/1")
      .send({ nombre: "Rol 1" });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, nombre: "Rol 1" });
  });

  test("Error al actualizar rol", async () => {
    rolesUsuarioController.updateRol.mockImplementationOnce((req, res) => {
      res.status(500).send("Error");
    });
    const response = await request(app)
      .put("/roles/1")
      .send({ nombre: "Rol 1" });
    expect(response.status).toBe(500);
    expect(response.text).toBe("Error");
  });
});

describe("DELETE /roles/:id - Eliminar rol", () => {
  test("Eliminar rol exitosamente", async () => {
    rolesUsuarioController.deleteRol.mockImplementationOnce((req, res) => {
      res.json({ id: 1, nombre: "Rol 1" });
    });
    const response = await request(app).delete("/roles/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, nombre: "Rol 1" });
  });

  test("Error al eliminar rol", async () => {
    rolesUsuarioController.deleteRol.mockImplementationOnce((req, res) => {
      res.status(500).send("Error");
    });
    const response = await request(app).delete("/roles/1");
    expect(response.status).toBe(500);
    expect(response.text).toBe("Error");
  });
});
