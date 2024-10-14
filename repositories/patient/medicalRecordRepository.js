const MedicalRecord = require('../../models/patient/medicalRecordModel');

class MedicalRecordRepository {
  async create(recordData) {
    const record = new MedicalRecord(recordData);
    return await record.save();
  }

  async findAll() {
    return await MedicalRecord.find().lean();
  }

  async findById(id) {
    return await MedicalRecord.findById(id).lean();
  }

  async findByUserId(userId) {
    return await MedicalRecord.find({ userId }).lean();
  }

  async update(id, updatedData) {
    return await MedicalRecord.findByIdAndUpdate(id, updatedData, { new: true }).lean();
  }

  async delete(id) {
    return await MedicalRecord.findByIdAndDelete(id);
  }
}

module.exports = new MedicalRecordRepository();
