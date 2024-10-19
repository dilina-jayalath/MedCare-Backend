const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
connectDB.connect(process.env.MONGO_URI);


// Middleware
app.use(cors());
app.use(express.json());



// Routes
const demographicRoutes = require("./routes/patient/demographicRoutes");
const BioDataRoutes = require("./routes/patient/bioDataRoutes");
const appointmentRoutes = require('./routes/patient/appointmentRoutes');
const doctorRoutes = require('./routes/patient/doctorRoutes');
const medicalRecord = require('./routes/patient/medicalRecordRoutes');
const userRoutes = require('./routes/user/userRoutes');
const authRoutes = require('./routes/auth/authRoutes');
const patientRoutes = require('./routes/patient/patientRoutes');

// Routes
app.use("/patient/demographic", demographicRoutes); // Ensure this matches your test file
app.use("/patient/biodata", BioDataRoutes); // Ensure this matches your test file
app.use("/patient/appointments", appointmentRoutes); // Ensure this matches your test file
app.use("/patient/doctors", doctorRoutes); // Ensure this matches your test file
app.use("/patient/medical", medicalRecord); // Ensure this matches your test file
app.use("/user", userRoutes); // Ensure this matches your test file
app.use("/auth", authRoutes); // Ensure this matches your test file
app.use("/patients", patientRoutes); // Ensure this matches your test file


module.exports = app;
