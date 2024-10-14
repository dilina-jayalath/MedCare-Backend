const appointmentRepository = require('../../repositories/patient/appointmentRepository');
const appointmentFactory = require('../../factories/patient/appointmentFactory');

class AppointmentController {
  async getAllAppointments(req, res) {
    try {
      const appointments = await appointmentRepository.findAll();
      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch appointments', error });
    }
  }

  async getAppointmentById(req, res) {
    const { id } = req.params;
    try {
      const appointment = await appointmentRepository.findById(id);
      if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
      res.status(200).json(appointment);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching appointment', error });
    }
  }

  async getAppointmentsByUserId(req, res) {
    const { userId } = req.params;
    try {
      const appointments = await appointmentRepository.findByUserId(userId);
      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user appointments', error });
    }
  }

  async createAppointment(req, res) {
    try {
      const appointmentData = appointmentFactory.createAppointment(req.body);
      const newAppointment = await appointmentRepository.create(appointmentData);
      res.status(201).json(newAppointment);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create appointment', error });
    }
  }

  async updateAppointment(req, res) {
    const { id } = req.params;
    try {
      const updatedAppointment = await appointmentRepository.update(id, req.body);
      if (!updatedAppointment) return res.status(404).json({ message: 'Appointment not found' });
      res.status(200).json(updatedAppointment);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update appointment', error });
    }
  }

  async deleteAppointment(req, res) {
    const { id } = req.params;
    try {
      const deletedAppointment = await appointmentRepository.delete(id);
      if (!deletedAppointment) return res.status(404).json({ message: 'Appointment not found' });
      res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete appointment', error });
    }
  }
}

module.exports = new AppointmentController();
