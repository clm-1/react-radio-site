const express = require('express');
const router = express.Router();
const episodeController = require('../controllers/episodeController');

router.get('/:programId', episodeController.getAllEpisodesByProgram);

module.exports = router;