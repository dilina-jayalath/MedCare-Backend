const MedicalRecordFactory = require('../../factories/patient/medicalRecordFactory');
const medicalRecordRepository = require('../../repositories/patient/medicalRecordRepository');

// Create new medical record
exports.addMedicalRecord = async (req, res) => {
  try {
    const recordData = MedicalRecordFactory.createMedicalRecord(req.body);
    const record = await medicalRecordRepository.create(recordData);
    return res.status(201).json(record);
  } catch (error) {
    console.error('Error adding medical record:', error);
    return res.status(500).json({ message: 'Failed to add medical record', error });
  }
};

// Get all medical records
exports.getAllMedicalRecords = async (req, res) => {
  try {
    const records = await medicalRecordRepository.findAll();
    return res.status(200).json(records);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch medical records', error });
  }
};

// Get medical record by ID
exports.getMedicalRecordById = async (req, res) => {
  try {
    const record = await medicalRecordRepository.findById(req.params.id);
    if (!record) return res.status(404).json({ message: 'Medical record not found' });
    return res.status(200).json(record);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch medical record', error });
  }
};

exports.getMedicalRecordByUserId = async (req, res) => {
  try {
    const record = await medicalRecordRepository.findByUserId(req.params.id);
    if (!record) return res.status(404).json({ message: 'Medical record not found' });
    return res.status(200).json(record);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch medical record', error });
  }
};

// Update medical record by ID
exports.updateMedicalRecord = async (req, res) => {
  try {
    const updatedRecord = await medicalRecordRepository.update(req.params.id, req.body);
    if (!updatedRecord) return res.status(404).json({ message: 'Medical record not found' });
    return res.status(200).json(updatedRecord);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update medical record', error });
  }
};

// Delete medical record by ID
exports.deleteMedicalRecord = async (req, res) => {
  try {
    const deletedRecord = await medicalRecordRepository.delete(req.params.id);
    if (!deletedRecord) return res.status(404).json({ message: 'Medical record not found' });
    return res.status(200).json({ message: 'Medical record deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete medical record', error });
  }
};
