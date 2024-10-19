class UserFactory {
    static createUser(data) {
      return {
        username: data.name,
        password: data.password,
        email: data.email,
        phone: data.phone,
        role: data.role
      };
    }
}