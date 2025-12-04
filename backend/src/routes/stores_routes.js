const express = require('express');
const { authenticate } = require('../middleware/auth');
const storesController = require('../controllers/stores.controller');
const { body, param } = require('express-validator');


const router = express.Router();
router.get('/', authenticate, storesController.listStores);
router.get('/:id', authenticate, storesController.getStore);
router.post('/:id/rating', authenticate, [ param('id').isUUID(), body('score').isInt({ min: 1, max: 5 }) ], storesController.submitRating);
router.put('/:id/rating', authenticate, [ param('id').isUUID(), body('score').isInt({ min: 1, max: 5 }) ], storesController.updateRating);


module.exports = router;