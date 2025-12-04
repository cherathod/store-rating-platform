const express = require('express');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');
const { Store, Rating, User } = require('../models');


const router = express.Router();
router.use(authenticate, authorize(['store_owner']));


router.get('/stores', async (req, res, next) => {
try {
const stores = await Store.findAll({ where: { owner_id: req.user.id } });
res.json({ items: stores });
} catch (err) { next(err); }
});


router.get('/stores/:id/ratings', async (req, res, next) => {
try {
const store = await Store.findByPk(req.params.id);
if (!store) return res.status(404).json({ message: 'Store not found' });
if (store.owner_id !== req.user.id) return res.status(403).json({ message: 'Forbidden' });


const ratings = await Rating.findAll({ where: { store_id: store.id }, include: [{ model: User, attributes: ['id','name','email','address'] }] });
const avg = await Rating.aggregate('score', 'avg', { where: { store_id: store.id } });
res.json({ average: avg ? Number(avg).toFixed(1) : null, items: ratings });
} catch (err) { next(err); }
});


module.exports = router;