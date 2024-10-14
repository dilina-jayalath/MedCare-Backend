class DemographicFactory {
    static createDemographic(data) {
      return {
        firstName: data.firstName,
        lastName: data.lastName,
        birthday: data.birthday,
        gender: data.gender,
        address: data.address,
        mobileNumber: data.mobileNumber,
        emergencyContactNumber: data.emergencyContactNumber,
        userId: data.userId,
      };
    }
  }
  
  module.exports = DemographicFactory;
  