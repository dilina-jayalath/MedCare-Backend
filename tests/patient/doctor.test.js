require('dotenv').config();
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');

const sampleDoctor = {
  name: "Dr. John Doe",
  specialty: "Cardiologist",
  hospital: "Christ Hospital",
  rating: "4.5",
  reviews: "4,442 reviews",
  image: "https://via.placeholder.com/150"
};

describe('Doctor API', () => {
  let doctorId;

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

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a new doctor', async () => {
    const res = await request(app).post('/patient/doctors/add').send(sampleDoctor);
    expect(res.statusCode).toBe(201);
    doctorId = res.body._id;
  });

  it('should get all doctors', async () => {
    const res = await request(app).get('/patient/doctors');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get a doctor by ID', async () => {
    const res = await request(app).get(`/patient/doctors/${doctorId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('name', sampleDoctor.name);
  });

  it('should update a doctor', async () => {
    const updatedDoctor = { ...sampleDoctor, rating: "4.8" };
    const res = await request(app).put(`/patient/doctors/${doctorId}`).send(updatedDoctor);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('rating', 4.8);
  });

  it('should delete a doctor', async () => {
    const res = await request(app).delete(`/patient/doctors/${doctorId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Doctor deleted successfully');
  });
});
