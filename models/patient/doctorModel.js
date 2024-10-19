const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  hospital: { type: String, required: true },
  rating: { type: Number, required: false },
  reviews: { type: String, required: false },
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
