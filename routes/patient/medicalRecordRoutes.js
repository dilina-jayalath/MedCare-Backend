const express = require('express');
const medicalRecordController = require('../../controllers/patient/medicalRecordController');
const router = express.Router();

router.post('/add', medicalRecordController.addMedicalRecord);
router.get('/all', medicalRecordController.getAllMedicalRecords);
router.get('/:id', medicalRecordController.getMedicalRecordById);
router.put('/update/:id', medicalRecordController.updateMedicalRecord);
router.delete('/delete/:id', medicalRecordController.deleteMedicalRecord);

module.exports = router;
