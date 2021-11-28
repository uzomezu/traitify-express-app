const express = require('express');
const router  = express.Router();
const assessmentController = require('../controllers/assessment.controller')

router.post('/', assessmentController.logAssesment);
router.put('/:id', assessmentController.completeAssessment)

module.exports = router;