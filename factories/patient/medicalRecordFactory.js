class MedicalRecordFactory {
  static createMedicalRecord(data) {
    return {
      date: data.date ? new Date(data.date) : new Date(),
      condition: data.condition || 'Unknown Condition',
      notes: data.notes || '',
      followUpDate: data.followUpDate ? new Date(data.followUpDate) : null,
      prescription: data.prescription || '',
      userId: data.userId,
    };
  }
}

module.exports = MedicalRecordFactory;
