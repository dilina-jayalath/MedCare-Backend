const UserRepository = require('../../repositories/user/userRepository');
const PatientRepository = require('../../repositories/patient/patientRepository');
const DoctorRepository = require('../../repositories/patient/doctorRepository');
class UserController {
    async getAllUsers(req, res) {
        try {
            const users = await UserRepository.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Failed to get users', error });
        }
    }

    async getUserById(req, res) {
        try {
            const user = await UserRepository.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Failed to get user', error });
        }
    }

    async updateUser(req, res) {
        try {
            const updatedUser = await UserRepository.update(req.params.id, req.body);
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: 'Failed to update user', error });
        }
    }

    async deleteUser(req, res) {
        try {
            const deletedUser = await UserRepository.delete(req.params.id);
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete user', error });
        }
    }

}

module.exports = new UserController();
