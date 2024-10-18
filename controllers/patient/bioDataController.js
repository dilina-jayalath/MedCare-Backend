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
      const data = await BioDataRepository.getByUserId(userId);
      if (!data) {
        return res.status(404).json({ message: 'Bio data not found for the user' });
      }
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching demographic data', error });
    }
  }

  async add(req, res) {
    try {
      // Destructure the relevant fields from the request body
      const { userId, bloodGroup, bmi, weight, height, conditions, details } = req.body;

      // Validate required fields
      if (!userId || !bloodGroup || !bmi || !weight || !height) {
        return res.status(400).json({ message: "All required fields must be provided." });
      }

      // Create the new bioData object with the expected structure for conditions
      const bioData = {
        userId,
        bloodGroup,
        bmi,
        weight,
        height,
        conditions: {
          chronic: conditions?.chronic || [],
          surgeries: conditions?.surgeries || [],
          vaccinations: conditions?.vaccinations || [],
        },
        details,
      };

      // Save the new biographic data entry through the repository
      const newBioData = await BioDataRepository.add(bioData);

      // Return a success response
      res.status(201).json({ message: "Biographic data added successfully!", bioData: newBioData });
    } catch (error) {
      console.error("Error adding biographic data:", error);
      res.status(500).json({ message: "Error adding bio data", error: error.message });
    }
  }

  async update(req, res) {
    try {
        const { id } = req.params;
        const { bloodGroup, bmi, weight, height, conditions, details } = req.body;

        // Validate required fields
        if (!bloodGroup || !bmi || !weight || !height) {
            return res.status(400).json({ message: "All required fields must be provided." });
        }

        // Update the bioData object
        const updatedBioData = {
            bloodGroup,
            bmi,
            weight,
            height,
            conditions: {
                chronic: conditions?.chronic || [],
                surgeries: conditions?.surgeries || [],
                vaccinations: conditions?.vaccinations || [],
            },
            details,
        };

        const result = await BioDataRepository.updateById(id, updatedBioData);

        if (!result) {
            return res.status(404).json({ message: 'BioData not found' });
        }

        res.status(200).json({ message: "Biographic data updated successfully!", bioData: result });
    } catch (error) {
        console.error("Error updating biographic data:", error);
        res.status(500).json({ message: "Error updating bio data", error: error.message });
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
