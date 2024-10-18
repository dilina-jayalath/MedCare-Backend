const express = require('express');
const router = express.Router();
const authController = require('../../controllers/auth/authController');

router.post('/register', authController.register); // General registration
router.post('/login', authController.login); // User login
router.get('/verify', authController.verifyToken, (req, res) => {
    // If the token is verified, respond with success
    res.status(200).json({ message: "Token is valid", user: req.user });
});

module.exports = router;
