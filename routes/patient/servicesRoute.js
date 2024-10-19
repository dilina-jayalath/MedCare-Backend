const express = require('express');
const router = express.Router();
const servicesController = require('../../controllers/patient/servicesController');

router.get('/', servicesController.getAllServices);
router.get('/:id', servicesController.getServiceById);
router.post('/add', servicesController.createService);
router.put('/:id', servicesController.updateService);
router.delete('/:id', servicesController.deleteService);

module.exports = router;
