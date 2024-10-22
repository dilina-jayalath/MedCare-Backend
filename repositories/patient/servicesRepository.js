const Services = require('../../models/patient/servicesModel');

class ServicesRepository {
  async create(servicesData) {
    const newService = new Services(servicesData);
    return await newService.save();
  }

  async findAll() {
    return await Services.find();
  }

  async findById(id) {
    return await Services.findById(id);
  }

  async findByUserId(userId) {
    return await Services.find({ userId });
  }

  async update(id, servicesData) {
    return await Services.findByIdAndUpdate(id, servicesData, { new: true });
  }

  async delete(id) {
    return await Services.findByIdAndDelete(id);
  }
}

module.exports = new ServicesRepository();
