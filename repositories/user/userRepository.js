const User = require('../../models/user/userModel');

class UserRepository {
    async create(userData) {
        const user = new User(userData);
        return await user.save();
    }

    async findByUsername(username) {
        return await User.findOne({ username });
    }

    async findById(userId) {
        return await User.findOne({ _id: userId });
    }

    // Other repository methods...
}

module.exports = new UserRepository();
