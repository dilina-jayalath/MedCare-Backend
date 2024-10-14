class AppointmentFactory {
    static createAppointment(data) {
      return {
        userId: data.userId,
        date: new Date(data.date),
        time: data.time,
        userName: data.userName,
        doctorName: data.doctorName,
        doctorType: data.doctorType,
        doctorPic: data.doctorPic,
        problem: data.problem,
        notes: data.notes,
        additionalInfo: data.additionalInfo,
        file: data.file
      };
    }
  }
  
  module.exports = AppointmentFactory;
  