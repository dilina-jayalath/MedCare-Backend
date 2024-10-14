const express = require('express');
const BioDataController = require('../../controllers/patient/bioDataController');

const router = express.Router();

router.get('/all', BioDataController.getAll);           // Get all biodata records
router.get('/:id', BioDataController.getById);          // Get biodata by ID
router.get('/user/:userId', BioDataController.getByUserId); // Get biodata by user ID
router.post('/add', BioDataController.add);             // Add new biodata
router.delete('/delete/:id', BioDataController.deleteById); // Delete biodata by ID

module.exports = router;
