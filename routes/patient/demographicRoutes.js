const express = require('express');
const DemographicController = require('../../controllers/patient/demographicController');

const router = express.Router();

router.get('/all', DemographicController.getAll);
router.get('/:id', DemographicController.getById);
router.get('/user/:userId', DemographicController.getByUserId);
router.post('/add', DemographicController.add);
router.delete('/delete/:id', DemographicController.deleteById);
router.put('/update', DemographicController.update);


module.exports = router;
