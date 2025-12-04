const express = require('express');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');
const adminController = require('../controllers/admin.controller');


const router = express.Router();
router.use(authenticate, authorize(['admin']));
router.get('/dashboard', adminController.dashboard);
router.post('/users', adminController.createUser);
router.get('/users', adminController.listUsers);
router.get('/users/:id', adminController.getUser);
router.post('/stores', adminController.createStore);
router.get('/stores', adminController.listStores);


module.exports = router;