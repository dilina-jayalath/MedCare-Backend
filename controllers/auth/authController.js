const UserRepository = require("../../repositories/user/userRepository");
const PatientRepository = require("../../repositories/patient/patientRepository");
const DoctorRepository = require("../../repositories/patient/doctorRepository");
const jwt = require("jsonwebtoken");

class AuthController {
  async register(req, res) {
    const {
      username,
      password,
      email,
      phone,
      role,
      image,
      name,
      age,
      address,
      specialty,
      hospital,
    } = req.body;
    try {
      // Check if user already exists
      const existingUser = await UserRepository.findByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const userData = { username, password, email, phone, role, image };
      const newUser = await UserRepository.create(userData);

      // Extend registration based on user role (Patient or Doctor)
      if (role === "patient") {
        const patientData = { userId: newUser._id, name, age, address };
        await PatientRepository.create(patientData);
      } else if (role === "doctor") {
        const doctorData = { userId: newUser._id, name, specialty, hospital };
        await DoctorRepository.create(doctorData);
      } else {
        return res.status(400).json({ message: "Invalid role" });
      }

      res
        .status(201)
        .json({ message: "User registered successfully", newUser });
    } catch (error) {
      res.status(500).json({ message: "Failed to register user", error });
    }
  }

  async login(req, res) {
    const { username, password } = req.body;
    try {
      const user = await UserRepository.findByUsername(username);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the password matches (without hashing)
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user._id, role: user.role }, "2fe3ce2f", {
        expiresIn: "1h",
      });
      res.status(200).json({ token, role: user.role });
    } catch (error) {
      res.status(500).json({ message: "Login failed", error });
    }
  }

  async verifyToken(req, res, next) {
    const token = req.headers["authorization"]?.split(" ")[1];
    console.log("Token received: ", token);
    if (token) {
        jwt.verify(token, "2fe3ce2f", (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Invalid token" });
            }
            console.log("Token authenticated");
            console.log("User from JWT:", user);
            req.user = user;
            next(); // Call the next middleware
        });
    } else {
        res.status(401).json({ message: "No token provided" });
    }
}
}

module.exports = new AuthController();
