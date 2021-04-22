const express = require('express');
const router = express.Router();
const programController = require('../controllers/programController');

router.get('', programController.getAllPrograms);
router.get('/:programId', programController.getProgramById);
router.get('/:programId/schedule', programController.getProgramSchedule);
router.get('/:programId/broadcasts', programController.getProgramBroadcasts);

module.exports = router;