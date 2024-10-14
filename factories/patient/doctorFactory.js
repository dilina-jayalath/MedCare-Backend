class DoctorFactory {
    static createDoctor(data) {
      return {
        name: data.name,
        specialty: data.specialty,
        hospital: data.hospital,
        rating: parseFloat(data.rating),
        reviews: data.reviews,
        image: data.image
      };
    }
  }
  
  module.exports = DoctorFactory;
  