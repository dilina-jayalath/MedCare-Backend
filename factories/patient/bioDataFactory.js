class BioDataFactory {
    static createBioData(data) {
      return {
        bloodGroup: data.bloodGroup,
        weight: data.weight,
        height: data.height,
        allergies: data.allergies,
        userId: data.userId,
      };
    }
  }
  
  module.exports = BioDataFactory;
  