const Demographic = require('../../models/patient/demographicModel');

class DemographicRepository {
  async getAll() {
    return await Demographic.find({});
  }

  async getById(id) {
    return await Demographic.findById(id);
  }

  async getByUserId(userId) {
    return await Demographic.findOne({ userId });
  }

  async add(demographicData) {
    const demographic = new Demographic(demographicData);
    return await demographic.save();
  }

  async deleteById(id) {
    return await Demographic.findByIdAndDelete(id);
  }
}

module.exports = new DemographicRepository();
