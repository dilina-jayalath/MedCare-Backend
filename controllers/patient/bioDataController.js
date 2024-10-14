const BioDataRepository = require('../../repositories/patient/bioDataRepository');

class BioDataController {
  async getAll(req, res) {
    try {
      const bioDataList = await BioDataRepository.getAll();
      res.status(200).json(bioDataList);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching bio data', error });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const bioData = await BioDataRepository.getById(id);
      if (!bioData) {
        return res.status(404).json({ message: 'BioData not found' });
      }
      res.status(200).json(bioData);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching bio data', error });
    }
  }

  async getByUserId(req, res) {
    try {
      const { userId } = req.params;
      const bioData = await BioDataRepository.getByUserId(userId);
      if (!bioData.length) {
        return res.status(404).json({ message: 'BioData not found for this user' });
      }
      res.status(200).json(bioData);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching bio data', error });
    }
  }

  async add(req, res) {
    try {
      const bioData = req.body;
      const newBioData = await BioDataRepository.add(bioData);
      res.status(201).json(newBioData);
    } catch (error) {
      res.status(500).json({ message: 'Error adding bio data', error });
    }
  }

  async deleteById(req, res) {
    try {
      const { id } = req.params;
      const deletedBioData = await BioDataRepository.deleteById(id);
      if (!deletedBioData) {
        return res.status(404).json({ message: 'BioData not found' });
      }
      res.status(200).json({ message: 'BioData deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting bio data', error });
    }
  }
}

module.exports = new BioDataController();
