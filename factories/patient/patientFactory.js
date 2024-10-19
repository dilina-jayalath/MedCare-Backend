class PatientFactory {
    static createPatient(data) {
        return {
            userId: data.userId,
            name: data.name,
            age: data.age,
            address: data.address
        };
    }
}