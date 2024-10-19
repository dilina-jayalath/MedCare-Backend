const BioData = require("../../models/patient/bioDataModel");

class BioDataRepository {
  async getAll() {
    return await BioData.find({});
  }

  async getById(id) {
    return await BioData.findById(id);
  }

  async getByUserId(userId) {
    return await BioData.findOne({ userId });
  }

  async add(bioData) {
    const newBioData = new BioData(bioData);
    return await newBioData.save();
  }

  async deleteById(id) {
    return await BioData.findByIdAndDelete(id);
  }

  async updateById(id, updatedData) {
    try {
      const updatedBioData = await BioData.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
      return updatedBioData;
    } catch (error) {
      throw new Error("Error updating bio data: " + error.message);
    }
  }
}

module.exports = new BioDataRepository();
