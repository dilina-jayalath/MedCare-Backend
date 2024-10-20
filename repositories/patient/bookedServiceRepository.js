const BookedService = require('../../models/patient/bookedServiceModel');

class BookedServiceRepository {
  // Create a new booked service
  async create(bookedServiceData) {
    const newBookedService = new BookedService(bookedServiceData);
    return await newBookedService.save();
  }

  // Find all booked services and populate the 'serviceId' with service details
  async findAll() {
    return await BookedService.find().populate('serviceId'); // Populating the service details
  }

  // Find a booked service by ID and populate the 'serviceId'
  async findById(id) {
    return await BookedService.findById(id).populate('serviceId'); // Populating the service details
  }

  // Find all booked services by userId and populate the 'serviceId'
  async findByUserId(userId) {
    return await BookedService.find({ userId }).populate('serviceId'); // Populating the service details
  }

  // Update a booked service by ID
  async update(id, bookedServiceData) {
    return await BookedService.findByIdAndUpdate(id, bookedServiceData, { new: true }).populate('serviceId'); // Populate after update
  }

  // Delete a booked service by ID
  async delete(id) {
    return await BookedService.findByIdAndDelete(id);
  }
}

module.exports = new BookedServiceRepository();
