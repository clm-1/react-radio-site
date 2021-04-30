const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Base route
// /api/v1/users

router.get('/whoami', userController.whoami);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('', userController.getAllUsers);
router.get('/:userId', userController.getUserById);
router.get('/:userId/favourites', userController.getFavouritesByUserId);
router.put('/:userId/update', userController.addFavourite);
router.post('/:userId/addfavourite', userController.addFavourite);
router.delete('/:userId/removefavourite', userController.removeFavourite);
router.post('/register', userController.register);

module.exports = router;