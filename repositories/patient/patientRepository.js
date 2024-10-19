const Patient = require('../../models/patient/patientModel');

class PatientRepository {
    async create(patientData) {
        const patient = new Patient(patientData);
        return await patient.save();
    }
    
    async findAll() {
        return await Patient.find();
    }
    
    async findById(id) {
        return await Patient.findById(id);
    }
    
    async update(id, patientData) {
        return await Patient.findByIdAndUpdate(id, patientData, { new: true });
    }
    
    async delete(id) {
        return await Patient.findByIdAndDelete(id);
    }
    }

module.exports = new PatientRepository();