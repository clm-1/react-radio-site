express = require('express');
const router = express.Router();
const channelController = require('../controllers/channelController');

router.get('', channelController.getAllChannels);
router.get('/:channelId', channelController.getChannelById);
router.get('/:channelId/programs', channelController.getAllProgramsByChannel);
router.get('/schedule/:channelId', channelController.getChannelSchedule);

module.exports = router;