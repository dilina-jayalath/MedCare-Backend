const doctorRepository = require('../../repositories/patient/doctorRepository');
const doctorFactory = require('../../factories/patient/doctorFactory');

class DoctorController {
  async getAllDoctors(req, res) {
    try {
      const doctors = await doctorRepository.findAll();
      res.status(200).json(doctors);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch doctors', error });
    }
  }

  async getDoctorById(req, res) {
    const { id } = req.params;
    try {
      const doctor = await doctorRepository.findById(id);
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
      res.status(200).json(doctor);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching doctor', error });
    }
  }

  async createDoctor(req, res) {
    try {
      const doctorData = doctorFactory.createDoctor(req.body);
      const newDoctor = await doctorRepository.create(doctorData);
      res.status(201).json(newDoctor);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create doctor', error });
    }
  }

  async updateDoctor(req, res) {
    const { id } = req.params;
    try {
      const updatedDoctor = await doctorRepository.update(id, req.body);
      if (!updatedDoctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
      res.status(200).json(updatedDoctor);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update doctor', error });
    }
  }

  async deleteDoctor(req, res) {
    const { id } = req.params;
    try {
      const deletedDoctor = await doctorRepository.delete(id);
      if (!deletedDoctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
      res.status(200).json({ message: 'Doctor deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete doctor', error });
    }
  }
}

module.exports = new DoctorController();
