import request from "supertest";
import app from "../src/app";
import sequelize from "../config/database";

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
    expect(res.text).toBe("API en funcionamiento");
  });
});
