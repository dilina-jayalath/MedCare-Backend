const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    address: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
