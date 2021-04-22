const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('', userController.getAllUsers);
router.get('/:userId', userController.getUserById);
router.get('/:userId/favourites', userController.getFavouritesByUserId);
router.post('/register', userController.register);

module.exports = router;