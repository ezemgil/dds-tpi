import request from "supertest";
import sequelize from "../config/database";
import app from "../src/app";

beforeAll(async () => {
  await sequelize.sync();
});

afterAll(async () => {
  await sequelize.close();
});

describe("GET /", () => {
  it("should return API status", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toBe("Estado de la API: OK");
  });
});

