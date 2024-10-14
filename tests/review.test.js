require("dotenv").config(); // Load environment variables for testing
const request = require("supertest");
const app = require("../app"); // Import app from app.js
const mongoose = require("mongoose");

const sampleReview = {
  type: "star",
  rating: 5,
  review: "Great product!",
  userId: "635c43f43d8283bb1c06a2a1", // Assume a valid ObjectId
};

describe("Review API", () => {
  // Connect to the test database
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should create a new review", async () => {
    const res = await request(app).post("/review/addreview").send(sampleReview);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("rating", 5);
    expect(res.body).toHaveProperty("review", "Great product!");
  });

  it("should return an error for missing fields", async () => {
    const res = await request(app)
      .post("/review/addreview")
      .send({ rating: 4 });
    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty("message", "Failed to add review");
  });

  it("should retrieve all reviews", async () => {
    const res = await request(app).get("/review/getallreview");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should return an empty array when no reviews exist", async () => {
    await mongoose.connection.collection("reviews").deleteMany({});
    const res = await request(app).get("/review/getallreview");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(0);
  });
});
