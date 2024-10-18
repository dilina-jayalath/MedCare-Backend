const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

describe('Medical Records API', () => {
  let medicalRecordId;
  const sampleData = {
    date: "2024-10-12",
    condition: "High Blood Pressure",
    notes: "Patient is under observation",
    followUpDate: "2024-11-12",
    prescription: "Aspirin",
    userId: "59b99db4cfa9a34dcd7885b6",
    pName: "John Doe",
    symptoms: "Headache",
  };

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

  it('should add a new medical record', async () => {
    const res = await request(app).post('/patient/medical/add').send(sampleData);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('condition', 'High Blood Pressure');
    medicalRecordId = res.body._id;
  });

  it('should retrieve all medical records', async () => {
    const res = await request(app).get('/patient/medical/all');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should retrieve a medical record by ID', async () => {
    const res = await request(app).get(`/patient/medical/${medicalRecordId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('condition', 'High Blood Pressure');
  });

  it('should update a medical record', async () => {
    const res = await request(app)
      .put(`/patient/medical/update/${medicalRecordId}`)
      .send({ notes: "Patient is improving" });
      
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('notes', 'Patient is improving');
  });

  it('should delete a medical record', async () => {
    const res = await request(app).delete(`/patient/medical/delete/${medicalRecordId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Medical record deleted successfully');
  });
});
