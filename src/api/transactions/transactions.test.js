import request from "supertest";

import app from "../../index";

beforeAll(async () => {
  try {
    await Goals.drop();
  } catch (error) {}
});

afterAll(async () => {
  try {
    await Goals.drop();
  } catch (error) {}
});

describe("GET /api/account", () => {
  it("responds with an array of accounts", async () =>
    request(app)
      .get("/api/account")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty("length");
      }));
});
