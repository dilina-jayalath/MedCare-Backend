const Doctor = require('../../models/patient/doctorModel');

class DoctorRepository {
  async create(doctorData) {
    const doctor = new Doctor(doctorData);
    return await doctor.save();
  }

  async findAll() {
    return await Doctor.find();
  }

  async findById(id) {
    return await Doctor.findById(id);
  }

  async update(id, doctorData) {
    return await Doctor.findByIdAndUpdate(id, doctorData, { new: true });
  }

  async delete(id) {
    return await Doctor.findByIdAndDelete(id);
  }
}

module.exports = new DoctorRepository();
