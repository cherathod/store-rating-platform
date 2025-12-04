const { Store, Rating, User, Sequelize } = require('../models');
const { validationResult } = require('express-validator');

module.exports = {

  // ---------------------------------------------------------
  // LIST STORES (with AVG rating + user's rating)
  // ---------------------------------------------------------
  listStores: async (req, res, next) => {
    try {
      const {
        page = 1,
        size = 20,
        sort = 'name.asc',
        name,
        address
      } = req.query;

      const [field, dir] = sort.split('.');
      const where = {};

      if (name) where.name = { [Sequelize.Op.like]: `%${name}%` };
      if (address) where.address = { [Sequelize.Op.like]: `%${address}%` };

      const items = await Store.findAndCountAll({
        where,
        limit: Number(size),
        offset: (page - 1) * size,
        order: [[field, dir.toUpperCase()]],
      });

      const mapped = await Promise.all(
        items.rows.map(async (store) => {
          // Overall average rating
          const avg = await Rating.findOne({
            where: { store_id: store.id },
            attributes: [
              [Sequelize.fn("AVG", Sequelize.col("score")), "avg"]
            ]
          });

          // User-specific rating
          let userRating = null;
          if (req.user) {
            const r = await Rating.findOne({
              where: {
                store_id: store.id,
                user_id: req.user.id
              }
            });
            if (r) userRating = r.score;
          }

          return {
            ...store.toJSON(),
            overallRating: avg?.dataValues.avg
              ? Number(avg.dataValues.avg).toFixed(1)
              : null,
            userRating
          };
        })
      );

      return res.json({
        page: Number(page),
        size: Number(size),
        total: items.count,
        items: mapped
      });

    } catch (err) {
      next(err);
    }
  },

  // ---------------------------------------------------------
  // GET STORE DETAILS
  // ---------------------------------------------------------
  getStore: async (req, res, next) => {
    try {
      const store = await Store.findByPk(req.params.id);

      if (!store) {
        return res.status(404).json({ message: 'Store not found' });
      }

      // Overall rating
      const avg = await Rating.findOne({
        where: { store_id: store.id },
        attributes: [
          [Sequelize.fn("AVG", Sequelize.col("score")), "avg"]
        ]
      });

      // User-specific rating
      let userRating = null;
      if (req.user) {
        const r = await Rating.findOne({
          where: {
            store_id: store.id,
            user_id: req.user.id
          }
        });
        if (r) userRating = r.score;
      }

      return res.json({
        ...store.toJSON(),
        overallRating: avg?.dataValues.avg
          ? Number(avg.dataValues.avg).toFixed(1)
          : null,
        userRating
      });

    } catch (err) {
      next(err);
    }
  },

  // ---------------------------------------------------------
  // SUBMIT RATING (create or update)
  // ---------------------------------------------------------
  submitRating: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const userId = req.user.id;
      const storeId = req.params.id;
      const { score } = req.body;

      // If rating exists → update it
      const existing = await Rating.findOne({
        where: { user_id: userId, store_id: storeId }
      });

      if (existing) {
        existing.score = score;
        await existing.save();

        const avg = await Rating.findOne({
          where: { store_id: storeId },
          attributes: [[Sequelize.fn("AVG", Sequelize.col("score")), "avg"]]
        });

        return res.json({
          rating: existing,
          average: avg?.dataValues.avg
            ? Number(avg.dataValues.avg).toFixed(1)
            : null
        });
      }

      // Otherwise create new rating
      const rating = await Rating.create({
        user_id: userId,
        store_id: storeId,
        score
      });

      const avg = await Rating.findOne({
        where: { store_id: storeId },
        attributes: [[Sequelize.fn("AVG", Sequelize.col("score")), "avg"]]
      });

      return res.status(201).json({
        rating,
        average: avg?.dataValues.avg
          ? Number(avg.dataValues.avg).toFixed(1)
          : null
      });

    } catch (err) {
      next(err);
    }
  },

  // ---------------------------------------------------------
  // UPDATE RATING (only if exists)
  // ---------------------------------------------------------
  updateRating: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const userId = req.user.id;
      const storeId = req.params.id;
      const { score } = req.body;

      const existing = await Rating.findOne({
        where: { user_id: userId, store_id: storeId }
      });

      if (!existing) {
        return res.status(404).json({ message: 'Rating not found' });
      }

      existing.score = score;
      await existing.save();

      const avg = await Rating.findOne({
        where: { store_id: storeId },
        attributes: [[Sequelize.fn("AVG", Sequelize.col("score")), "avg"]]
      });

      return res.json({
        rating: existing,
        average: avg?.dataValues.avg
          ? Number(avg.dataValues.avg).toFixed(1)
          : null
      });

    } catch (err) {
      next(err);
    }
  }
};
