const PatientRepository = require('../../repositories/patient/patientRepository');

class PatientController {
    // Get all patients
    async getAllPatients(req, res) {
        try {
            const patients = await PatientRepository.findAll();
            res.status(200).json(patients);
        } catch (error) {
            res.status(500).json({ message: 'Failed to get patients', error });
        }
    }

    // Get patient by ID
    async getPatientById(req, res) {
        try {
            const patient = await PatientRepository.findById(req.params.id);
            if (!patient) {
                return res.status(404).json({ message: 'Patient not found' });
            }
            res.status(200).json(patient);
        } catch (error) {
            res.status(500).json({ message: 'Failed to get patient', error });
        }
    }

    // Create a new patient
    async createPatient(req, res) {
        try {
            const newPatient = await PatientRepository.create(req.body);
            res.status(201).json(newPatient);
        } catch (error) {
            res.status(500).json({ message: 'Failed to create patient', error });
        }
    }

    // Update patient by ID
    async updatePatient(req, res) {
        try {
            const updatedPatient = await PatientRepository.update(req.params.id, req.body);
            if (!updatedPatient) {
                return res.status(404).json({ message: 'Patient not found' });
            }
            res.status(200).json(updatedPatient);
        } catch (error) {
            res.status(500).json({ message: 'Failed to update patient', error });
        }
    }

    // Delete patient by ID
    async deletePatient(req, res) {
        try {
            const deletedPatient = await PatientRepository.delete(req.params.id);
            if (!deletedPatient) {
                return res.status(404).json({ message: 'Patient not found' });
            }
            res.status(200).json({ message: 'Patient deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete patient', error });
        }
    }
}

module.exports = new PatientController();
