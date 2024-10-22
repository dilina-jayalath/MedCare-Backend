const bookedServiceRepository = require('../../repositories/patient/bookedServiceRepository');
const bookedServiceFactory = require('../../factories/patient/bookedServiceFactory');

class bookedServiceController {
  async getAllBookedServices(req, res) {
    try {
      const bookedServices = await bookedServiceRepository.findAll();
      res.status(200).json(bookedServices);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch booked services', error });
    }
  }

  async getBookedServiceById(req, res) {
    const { id } = req.params;
    try {
      const bokkedService = await bookedServiceRepository.findById(id);
      if (!bokkedService) return res.status(404).json({ message: 'Booked service not found' });
      res.status(200).json(bokkedService);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching booked service', error });
    }
  }

  async getBookedServicesByUserId(req, res) {
    const { userId } = req.params;
    try {
      const bookedServices = await bookedServiceRepository.findByUserId(userId);
      res.status(200).json(bookedServices);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user booked services', error });
    }
  }

  async createBookedService(req, res) {
    try {
      const bookedServiceData = bookedServiceFactory.createBookedService(req.body);
      const newBookedService = await bookedServiceRepository.create(bookedServiceData);
      res.status(201).json(newBookedService);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create booked service', error });
    }
  }

  async updateBookedService(req, res) {
    const { id } = req.params;
    try {
      const updatedBookedService = await bookedServiceRepository.update(id, req.body);
      if (!updatedBookedService) return res.status(404).json({ message: 'Booked service not found' });
      res.status(200).json(updatedBookedService);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update booked service', error });
    }
  }

  async deleteBookedService(req, res) {
    const { id } = req.params;
    try {
      const deleteBookedService = await bookedServiceRepository.delete(id);
      if (!deleteBookedService) return res.status(404).json({ message: 'Booked service not found' });
      res.status(200).json({ message: 'Booked service deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete booked service', error });
    }
  }
}

module.exports = new bookedServiceController();
