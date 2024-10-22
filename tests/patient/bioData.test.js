require("dotenv").config();
const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");

// Sample BioData to test
const sampleBioData = {
  conditions: "Vaccination",
  details: "all vaccines up to date",
  bmi: "22.86",
  bloodGroup: "O+",
  weight: "70kg",
  height: "175cm",
  allergies: "Pollen",
  userId: "59b99db4cfa9a34dcd7885b6", // Example User ID
};

describe("BioData API", () => {
  let bioDataId; // Variable to store ID of the created record

  // Database connection before tests
  beforeAll(async () => {
    if (!mongoose.connection.readyState) { // Check if there's already an active connection
      const dbURI = process.env.MONGO_URI_TEST || "mongodb://localhost:27017/test";
      try {
        console.log("Connecting to test database...");
        await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to test database.");
      } catch (error) {
        console.error("MongoDB connection error:", error);
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

  it("should add bio data", async () => {
    const res = await request(app)
      .post("/patient/biodata/add")
      .send(sampleBioData);
    expect(res.statusCode).toBe(201);
    expect(res.body.bioData).toHaveProperty("bloodGroup", "O+"); // Ensure the correct structure
    bioDataId = res.body.bioData._id; // Store ID for other tests
    console.log("Add response:", res.body);
  });
  

  // it("should add bio data", async () => {
  //   const res = await request(app)
  //     .post("/patient/biodata/add")
  //     .send(sampleBioData);
  
  //   expect(res.statusCode).toBe(201);
  //   expect(res.body).toHaveProperty("bloodGroup", "O+");
    
  //   bioDataId = res.body._id; // Capture ID for further tests
  //   console.log("Add response:", res.body);
  // });
  

// Test deleting bio data by ID
it("should delete bio data by ID", async () => {
  const res = await request(app).delete(`/patient/biodata/delete/${bioDataId}`);
  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty("message", "BioData deleted successfully");
  console.log("Delete response:", res.body);
});

// Test fetching deleted bio data by ID (should return 404)
it("should return 404 for deleted bio data by ID", async () => {
  const res = await request(app).get(`/patient/biodata/${bioDataId}`);
  expect(res.statusCode).toBe(404);
  expect(res.body).toHaveProperty("message", "BioData not found");
  console.log("Get deleted response:", res.body);
});

});
