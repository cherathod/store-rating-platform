const bcrypt = require('bcrypt');
const { User, Store, Rating, Sequelize } = require('../models');

// -----------------------------
// CREATE USER (Admin Only)
// -----------------------------
module.exports = {

  createUser: async (req, res, next) => {
    try {
      const { name, email, password, address, role } = req.body;

      // Check if email exists
      const exists = await User.findOne({ where: { email } });
      if (exists) {
        return res.status(409).json({ message: 'Email already exists' });
      }

      // Hash password
      const salt = await bcrypt.genSalt(12);
      const hash = await bcrypt.hash(password, salt);

      const user = await User.create({
        name,
        email,
        password_hash: hash,
        address,
        role
      });

      return res.status(201).json({
        id: user.id,
        email: user.email,
        role: user.role
      });

    } catch (err) {
      next(err);
    }
  },

  // -----------------------------
  // LIST USERS
  // -----------------------------
  listUsers: async (req, res, next) => {
    try {
      const {
        page = 1,
        size = 20,
        sort = 'name.asc',
        name,
        email,
        address,
        role
      } = req.query;

      const [field, dir] = sort.split('.');

      const where = {};

      if (name) where.name = { [Sequelize.Op.like]: `%${name}%` };
      if (email) where.email = { [Sequelize.Op.like]: `%${email}%` };
      if (address) where.address = { [Sequelize.Op.like]: `%${address}%` };
      if (role) where.role = role;

      const items = await User.findAndCountAll({
        where,
        limit: Number(size),
        offset: (page - 1) * size,
        order: [[field, dir.toUpperCase()]],
        attributes: ['id', 'name', 'email', 'address', 'role']
      });

      return res.json({
        page: Number(page),
        size: Number(size),
        total: items.count,
        items: items.rows
      });

    } catch (err) {
      next(err);
    }
  },

  // -----------------------------
  // GET USER DETAILS
  // -----------------------------
  getUser: async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: ['id', 'name', 'email', 'address', 'role']
      });

      if (!user) return res.status(404).json({ message: 'User not found' });

      const result = user.toJSON();

      // If Store Owner → calculate average rating
      if (user.role === 'store_owner') {
        const stores = await Store.findAll({
          where: { owner_id: user.id }
        });

        const storeIds = stores.map(s => s.id);

        if (storeIds.length > 0) {
          const avg = await Rating.findOne({
            where: { store_id: storeIds },
            attributes: [[Sequelize.fn('AVG', Sequelize.col('score')), 'avg']]
          });

          result.rating = avg?.dataValues.avg
            ? Number(avg.dataValues.avg).toFixed(1)
            : null;
        } else {
          result.rating = null;
        }
      }

      return res.json(result);

    } catch (err) {
      next(err);
    }
  },

  // -----------------------------
  // CREATE STORE
  // -----------------------------
  createStore: async (req, res, next) => {
    try {
      const { name, email, address, owner_id } = req.body;

      const store = await Store.create({
        name,
        email,
        address,
        owner_id
      });

      return res.status(201).json(store);

    } catch (err) {
      next(err);
    }
  },

  // -----------------------------
  // LIST STORES WITH AVG RATING
  // -----------------------------
  listStores: async (req, res, next) => {
    try {
      const {
        page = 1,
        size = 20,
        sort = 'name.asc',
        name,
        email,
        address
      } = req.query;

      const [field, dir] = sort.split('.');

      const where = {};

      if (name) where.name = { [Sequelize.Op.like]: `%${name}%` };
      if (email) where.email = { [Sequelize.Op.like]: `%${email}%` };
      if (address) where.address = { [Sequelize.Op.like]: `%${address}%` };

      const items = await Store.findAndCountAll({
        where,
        limit: Number(size),
        offset: (page - 1) * size,
        order: [[field, dir.toUpperCase()]]
      });

      const rows = await Promise.all(
        items.rows.map(async store => {
          const avg = await Rating.findOne({
            where: { store_id: store.id },
            attributes: [[Sequelize.fn('AVG', Sequelize.col('score')), 'avg']]
          });

          return {
            ...store.toJSON(),
            rating: avg?.dataValues.avg
              ? Number(avg.dataValues.avg).toFixed(1)
              : null
          };
        })
      );

      return res.json({
        page: Number(page),
        size: Number(size),
        total: items.count,
        items: rows
      });

    } catch (err) {
      next(err);
    }
  }

};
