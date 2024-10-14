const BioData = require('../../models/patient/bioDataModel');

class BioDataRepository {
  async getAll() {
    return await BioData.find({});
  }

  async getById(id) {
    return await BioData.findById(id);
  }

  async getByUserId(userId) {
    return await BioData.find({ userId });
  }

  async add(bioData) {
    const newBioData = new BioData(bioData);
    return await newBioData.save();
  }

  async deleteById(id) {
    return await BioData.findByIdAndDelete(id);
  }
}

module.exports = new BioDataRepository();
