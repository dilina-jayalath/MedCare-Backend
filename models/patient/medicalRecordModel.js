const mongoose = require("mongoose");

<<<<<<< Updated upstream
const medicalRecordSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  pName:{type: String , required : true},
  symptoms:{type:String , required : true},
  condition: { type: String, required: true },
  notes: { type: String, required: true },
  followUpDate: { type: Date },
  prescription: { type: String },
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
}, { timestamps: true });
=======
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
>>>>>>> Stashed changes

const MedicalRecord = mongoose.model("MedicalRecord", medicalRecordSchema);
module.exports = MedicalRecord;
