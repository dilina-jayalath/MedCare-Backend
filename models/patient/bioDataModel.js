const mongoose = require('mongoose');

const BioDataSchema = new mongoose.Schema({
  bloodGroup: { type: String, required: true },
  weight: { type: String, required: true },
  height: { type: String, required: true },
  allergies: { type: String, required: false },
  condition: { type: String, required: true },
  details: { type: String, required: false },
  bmi: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }, // Reference to the User model
}, { timestamps: true });

module.exports = mongoose.model('BioData', BioDataSchema);
