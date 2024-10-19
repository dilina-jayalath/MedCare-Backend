const mongoose = require("mongoose");


const medicalRecordSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    condition: { type: String, required: true },
    notes: { type: String, required: true },
    followUpDate: { type: Date },
    prescription: { type: String },
    symptoms: { type: String },
    prescription: { type: String },
    pname: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  },
  { timestamps: true }
);


const MedicalRecord = mongoose.model("MedicalRecord", medicalRecordSchema);
module.exports = MedicalRecord;
