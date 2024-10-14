const Appointment = require('../../models/patient/appointmentModel');

class AppointmentRepository {
  async create(appointmentData) {
    const newAppointment = new Appointment(appointmentData);
    return await newAppointment.save();
  }

  async findAll() {
    return await Appointment.find();
  }

  async findById(id) {
    return await Appointment.findById(id);
  }

  async findByUserId(userId) {
    return await Appointment.find({ userId });
  }

  async update(id, appointmentData) {
    return await Appointment.findByIdAndUpdate(id, appointmentData, { new: true });
  }

  async delete(id) {
    return await Appointment.findByIdAndDelete(id);
  }
}

module.exports = new AppointmentRepository();
