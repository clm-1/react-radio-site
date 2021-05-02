const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Base route
// /api/v1/users

router.get('/whoami', userController.whoami);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/:userId', userController.getUserById);
router.get('/:userId/favourites', userController.getFavouritesByUserId);
router.post('/:userId/addfavourite', userController.addFavourite);
router.delete('/:userId/removefavourite', userController.removeFavourite);
router.post('/register', userController.register);
router.put('/:userId/edit', userController.editUserInfo);

module.exports = router;