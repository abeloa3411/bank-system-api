import request from "supertest";

import app from "./index";

describe("GET /", () => {
  it("responds with a json message", (done) => {
    request(app)
      .get("/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(
        200,
        {
          msg: "The api is running well",
        },
        done
      );
  });
});
