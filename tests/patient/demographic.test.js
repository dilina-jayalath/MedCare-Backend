require("dotenv").config();
const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");

// Sample data to test
const sampleData = {
  firstName: "John",
  lastName: "Doe",
  birthday: "1990-01-01",
  gender: "M",
  address: "123 Main St",
  mobileNumber: "1234567890",
  emergencyContactNumber: "0987654321",
  userId: "59b99db4cfa9a34dcd7885b6", // Example User ID
};

describe("Demographic API", () => {
  let recordId; // Variable to store ID of the created record

  // Database connection before tests
  beforeAll(async () => {
    class Database {
      constructor() {
        this.connection = null;
      }

      async connect(URI) {
        if (!this.connection) {
          try {
            console.log("Connecting to test database...");
            this.connection = await mongoose.connect(process.env.MONGO_URI_TEST, );
            console.log("Connected to test database.");
          } catch (error) {
            console.error("MongoDB connection error:", error);
            process.exit(1);
          }
        }
        return this.connection;
      }
    }
  });


  // Close the database connection after tests
  afterAll(async () => {
    try {
      await mongoose.connection.close();
      console.log("Database connection closed.");
    } catch (error) {
      console.error("Failed to close the test database connection:", error);
    }
  });

  // Test adding demographic data
  it("should add demographic data", async () => {
    const res = await request(app)
      .post("/patient/demographic/add")
      .send(sampleData);
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("firstName", "John");
    expect(res.body).toHaveProperty("lastName", "Doe");
    recordId = res.body._id; // Store ID for other tests
    console.log("Add response:", res.body);
  });

  // Test fetching all demographic records
  it("should retrieve all demographic records", async () => {
    const res = await request(app).get("/patient/demographic/all");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    console.log("Get all response:", res.body);
  });

  // Test fetching demographic data by record ID
  it("should retrieve demographic data by ID", async () => {
    const res = await request(app).get(`/patient/demographic/${recordId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("firstName", "John");
    expect(res.body).toHaveProperty("lastName", "Doe");
    console.log("Get by ID response:", res.body);
  });

  // Test deleting demographic data by record ID
  it("should delete demographic data by ID", async () => {
    const res = await request(app).delete(
      `/patient/demographic/delete/${recordId}`
    );
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty(
      "message",
      "Demographic data deleted successfully"
    );
    console.log("Delete response:", res.body);
  });

  // Test fetching deleted demographic data by ID (should return 404)
  it("should return 404 for deleted demographic data by ID", async () => {
    const res = await request(app).get(`/patient/demographic/${recordId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("message", "Demographic data not found");
    console.log("Get deleted response:", res.body);
  });
});
