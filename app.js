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


// Routes
app.use("/patient/demographic", demographicRoutes); // Ensure this matches your test file
app.use("/patient/biodata", BioDataRoutes); // Ensure this matches your test file

module.exports = app;
