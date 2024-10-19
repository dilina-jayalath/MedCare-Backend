const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient'},
  date: { type: Date, required: true },
  time: { type: String, required: true },
  userName: { type: String, required: true },
  doctorName: { type: String, required: true },
  doctorType: { type: String, required: true },
  doctorPic: { type: String, required: true },
  problem: { type: String, required: true },
  notes: { type: String, required: false },
  additionalInfo: { type: String, required: false },
  file: { type: String, required: false }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
