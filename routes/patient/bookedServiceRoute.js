const express = require('express');
const router = express.Router();
const bookedServiceController = require('../../controllers/patient/bookedServiceController');

router.get('/', bookedServiceController.getAllBookedServices);
router.get('/:id', bookedServiceController.getBookedServiceById);
router.get('/user/:userId', bookedServiceController.getBookedServicesByUserId);
router.post('/add', bookedServiceController.createBookedService);
router.put('/:id', bookedServiceController.updateBookedService);
router.delete('/:id', bookedServiceController.deleteBookedService);

module.exports = router;
