const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    image: { type: String },
    role: { type: String, required: true, enum: ['doctor', 'patient'] },
    private: {type: Boolean},
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
