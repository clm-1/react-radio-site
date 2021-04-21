const express = require('express');
const router = express.Router();
const programController = require('../controllers/programController');

router.get('/categories', programController.getAllCategories);
router.get('/:categoryId', programController.getAllProgramsByCategory);

module.exports = router;