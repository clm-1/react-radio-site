const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Base route
// /api/v1/users

router.get('/whoami', userController.whoami);
router.post('/login', userController.login);
router.get('', userController.getAllUsers);
router.get('/:userId', userController.getUserById);
router.get('/:userId/favourites', userController.getFavouritesByUserId);
router.post('/register', userController.register);

module.exports = router;