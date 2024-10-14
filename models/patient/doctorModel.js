const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  hospital: { type: String, required: true },
  rating: { type: Number, required: true },
  reviews: { type: String, required: true }, // String like "4,442 reviews"
  image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
