const mongoose = require('mongoose');

const DemographicSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthday: { type: Date, required: true },
  gender: { type: String, enum: ['M', 'F'], required: true },
  address: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  emergencyContactNumber: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users'},
}, { timestamps: true });

const Demographic = mongoose.model('Demographic', DemographicSchema);
module.exports = Demographic;
