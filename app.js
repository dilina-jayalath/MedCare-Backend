const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
const router = express.Router();
connectDB.connect(process.env.MONGO_URI);

router.get("/", (req, res) => {
    res.send("App is running..");
});

// Middleware
app.use(cors());
app.use(express.json());
app.use


// Routes
const demographicRoutes = require("./routes/patient/demographicRoutes");
const BioDataRoutes = require("./routes/patient/bioDataRoutes");
const appointmentRoutes = require('./routes/patient/appointmentRoutes');
const doctorRoutes = require('./routes/patient/doctorRoutes');
const medicalRecord = require('./routes/patient/medicalRecordRoutes');
const userRoutes = require('./routes/user/userRoutes');
const authRoutes = require('./routes/auth/authRoutes');
const patientRoutes = require('./routes/patient/patientRoutes');
const servicesRouter = require('./routes/patient/servicesRoute')
const bookedServiceRouter = require('./routes/patient/bookedServiceRoute')

// Routes
app.use("/patient/demographic", demographicRoutes); // Ensure this matches your test file
app.use("/patient/biodata", BioDataRoutes); // Ensure this matches your test file
app.use("/patient/appointments", appointmentRoutes); // Ensure this matches your test file
app.use("/patient/doctors", doctorRoutes); // Ensure this matches your test file
app.use("/patient/medical", medicalRecord); // Ensure this matches your test file
app.use("/services", servicesRouter);
app.use("/bookedService", bookedServiceRouter);
app.use("/user", userRoutes); // Ensure this matches your test file
app.use("/auth", authRoutes); // Ensure this matches your test file
app.use("/patients", patientRoutes); // Ensure this matches your test file


module.exports = app;
