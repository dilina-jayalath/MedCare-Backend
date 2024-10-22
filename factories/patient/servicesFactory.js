class ServiceFactory {
    static createService(data) {
      return {
        servicesType: data.servicesType,
        amount: data.amount
      };
    }
  }
  
  module.exports = ServiceFactory;
  