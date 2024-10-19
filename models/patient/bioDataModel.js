const mongoose = require('mongoose');

const BioDataSchema = new mongoose.Schema({
  bloodGroup: { type: String, required: true },
  weight: { type: String, required: true },
  height: { type: String, required: true },
  allergies: { type: String, required: false },
  conditions: { 
    chronic: { type: [String], default: [] }, 
    surgeries: { type: [String], default: [] },
    vaccinations: { type: [String], default: [] }
  },
  bmi: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }, 
}, { timestamps: true });

module.exports = mongoose.model('BioData', BioDataSchema);
