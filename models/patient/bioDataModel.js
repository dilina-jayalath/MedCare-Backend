const mongoose = require('mongoose');

const BioDataSchema = new mongoose.Schema({
  bloodGroup: { type: String, required: true },
  weight: { type: String, required: true },
  height: { type: String, required: true },
  allergies: { type: String, required: false },
  condition: { type: String, required: true },
  details: { type: String, required: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }, // Reference to the User model
}, { timestamps: true });

module.exports = mongoose.model('BioData', BioDataSchema);
