const mongoose = require("mongoose");

class Database {
  constructor() {
    this.connection = null;
  }

  async connect(URI) {
    if (!this.connection) {
      try {
        this.connection = await mongoose.connect(URI);
        console.log("MongoDB connected");
      } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
      }
    }
    return this.connection;
  }
}

module.exports = new Database();
