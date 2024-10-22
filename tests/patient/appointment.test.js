require('dotenv').config();
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');

const sampleAppointment = {
  userId: "59b99db4cfa9a34dcd7885b6",
  date: "2023-09-05",
  time: "03:15 PM",
  userName: "dilina jayalath",
  doctorName: "Dr. White",
  doctorType: "Orthopedist",
  doctorPic: "images.doctor",
  problem: "Knee Pain Consultation",
  notes: "X-ray taken; advised physiotherapy.",
  additionalInfo: "Follow-up appointment scheduled for 2 weeks later.",
  file: "images.xray"
};

describe('Appointment API', () => {
  let appointmentId;

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

  it('should create a new appointment', async () => {
    const res = await request(app).post('/patient/appointments/add').send(sampleAppointment);
    expect(res.statusCode).toBe(201);
    appointmentId = res.body._id;
  });

  it('should get all appointments', async () => {
    const res = await request(app).get('/patient/appointments');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get appointment by ID', async () => {
    const res = await request(app).get(`/patient/appointments/${appointmentId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('userName', sampleAppointment.userName);
  });

  it('should get appointment by user ID', async () => {
    const res = await request(app).get(`/patient/appointments/user/${sampleAppointment.userId}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  
  it('should get appointment by fake ID', async () => {
    const res = await request(app).get(`/patient/appointments/user/${"fakeUid"}`);
    expect(res.statusCode).toBe(500);
    expect(Array.isArray(res.body)).toBe(false);
  });

  it('should update an appointment', async () => {
    const updatedAppointment = { ...sampleAppointment, problem: "Updated problem" };
    const res = await request(app).put(`/patient/appointments/${appointmentId}`).send(updatedAppointment);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('problem', 'Updated problem');
  });

  it('should delete an appointment', async () => {
    const res = await request(app).delete(`/patient/appointments/${appointmentId}`);
    expect(res.statusCode).toBe(200);
  });
});
