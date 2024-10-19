class BookedServiceFactory {
    static createBookedService(data) {
      return {
        userId: data.userId,
        date: new Date(data.date),
        time: data.time,
        serviceId: data.serviceId,
        userName: data.userName,
        paymentMethod: data.paymentMethod,
      };
    }
  }
  
  module.exports = BookedServiceFactory;
  