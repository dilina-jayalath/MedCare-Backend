const mongoose = require('mongoose');

const servicesSchema = new mongoose.Schema({
  servicesType: {
    type: String,
    enum: ['Xray', 'Labtest', 'Vaccine', 'Scan'],
    required: true // Ensuring the service type is mandatory
  },
  amount: { 
    type: Number, 
    required: true 
  },
  description: {
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('Services', servicesSchema);
