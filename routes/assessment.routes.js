const express = require('express');
const router  = express.Router();
const assessmentController = require('../controllers/assessment.controller');
const { isAuth } = require('../models/authtoken.model');

router.post('/', isAuth, assessmentController.logAssesment);
router.get('/current-assessment', isAuth, assessmentController.getCurrentAssessment)
router.put('/:id', isAuth, assessmentController.completeAssessment)

module.exports = router;