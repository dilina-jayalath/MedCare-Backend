const servicesRepository = require('../../repositories/patient/servicesRepository');
const servicesFactory = require('../../factories/patient/servicesFactory');

class servicesController {
  async getAllServices(req, res) {
    try {
      const services = await servicesRepository.findAll();
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch services', error });
    }
  }

  async getServiceById(req, res) {
    const { id } = req.params;
    try {
      const service = await servicesRepository.findById(id);
      if (!service) return res.status(404).json({ message: 'Service not found' });
      res.status(200).json(service);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching service', error });
    }
  }
  
  async createService(req, res) {
    try {
      const serviceData = servicesFactory.createService(req.body);
      const newservice = await servicesRepository.create(serviceData);
      res.status(201).json(newservice);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create service', error });
    }
  }

  async updateService(req, res) {
    const { id } = req.params;
    try {
      const updatedservice = await servicesRepository.update(id, req.body);
      if (!updatedservice) return res.status(404).json({ message: 'service not found' });
      res.status(200).json(updatedservice);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update service', error });
    }
  }

  async deleteService(req, res) {
    const { id } = req.params;
    try {
      const deletedservice = await servicesRepository.delete(id);
      if (!deletedservice) return res.status(404).json({ message: 'service not found' });
      res.status(200).json({ message: 'service deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete service', error });
    }
  }
}

module.exports = new servicesController();
