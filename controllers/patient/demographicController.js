const DemographicRepository = require('../../repositories/patient/demographicRepository');

class DemographicController {
  async getAll(req, res) {
    try {
      const data = await DemographicRepository.getAll();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching demographic data', error });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const data = await DemographicRepository.getById(id);
      if (!data) {
        return res.status(404).json({ message: 'Demographic data not found' });
      }
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching demographic data', error });
    }
  }

  async getByUserId(req, res) {
    try {
      const { userId } = req.params;
      const data = await DemographicRepository.getByUserId(userId);
      if (!data) {
        return res.status(404).json({ message: 'Demographic data not found for the user' });
      }
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching demographic data', error });
    }
  }

  async add(req, res) {
    try {
      const demographicData = req.body;
      const newDemographic = await DemographicRepository.add(demographicData);
      res.status(201).json(newDemographic);
    } catch (error) {
      res.status(500).json({ message: 'Error adding demographic data', error });
    }
  }

  async update(req, res) {
    try {
        const { userId } = req.body;
        const updatedData = req.body;
        const existingData = await DemographicRepository.getByUserId(userId);

        if (!existingData) {
            return res.status(404).json({ message: 'Demographic data not found for the user' });
        }

        const updatedDemographic = await DemographicRepository.update(userId, updatedData);
        res.status(200).json(updatedDemographic);
    } catch (error) {
        res.status(500).json({ message: 'Error updating demographic data', error });
    }
}


  async deleteById(req, res) {
    try {
      const { id } = req.params;
      const deletedData = await DemographicRepository.deleteById(id);
      if (!deletedData) {
        return res.status(404).json({ message: 'Demographic data not found' });
      }
      res.status(200).json({ message: 'Demographic data deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting demographic data', error });
    }
  }
}

module.exports = new DemographicController();
