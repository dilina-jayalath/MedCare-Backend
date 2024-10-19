class MedicalRecordFactory {
  static createMedicalRecord(data) {
    return {
      date: data.date ? new Date(data.date) : new Date(),
      condition: data.condition || 'Unknown Condition',
      notes: data.notes || '',
      followUpDate: data.followUpDate ? new Date(data.followUpDate) : null,
      prescription: data.prescription || '',
      userId: data.userId,
<<<<<<< Updated upstream
      pName: data.pName || 'Unknown Patient',
      symptoms: data.symptoms || 'Unknown Symptoms',
=======
      pname: data.pname || '',
>>>>>>> Stashed changes
    };
  }
}

module.exports = MedicalRecordFactory;
