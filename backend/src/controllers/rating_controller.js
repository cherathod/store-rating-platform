const { Rating, Store, Sequelize } = require('../models');
const { validationResult } = require('express-validator');

module.exports = {

  // ---------------------------------------------------------
  // CREATE RATING
  // ---------------------------------------------------------
  createRating: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const userId = req.user.id;
      const { store_id, score } = req.body;

      const storeExists = await Store.findByPk(store_id);
      if (!storeExists) {
        return res.status(404).json({ message: "Store not found" });
      }

      const existing = await Rating.findOne({
        where: { user_id: userId, store_id }
      });

      if (existing) {
        return res.status(409).json({ message: "Rating already exists" });
      }

      const rating = await Rating.create({
        user_id: userId,
        store_id,
        score
      });

      const avg = await Rating.findOne({
        where: { store_id },
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
  // UPDATE RATING
  // ---------------------------------------------------------
  updateRating: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const userId = req.user.id;
      const { store_id, score } = req.body;

      const rating = await Rating.findOne({
        where: { user_id: userId, store_id }
      });

      if (!rating) {
        return res.status(404).json({ message: "Rating not found" });
      }

      rating.score = score;
      await rating.save();

      const avg = await Rating.findOne({
        where: { store_id },
        attributes: [[Sequelize.fn("AVG", Sequelize.col("score")), "avg"]]
      });

      return res.json({
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
  // DELETE RATING
  // ---------------------------------------------------------
  deleteRating: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { store_id } = req.params;

      const rating = await Rating.findOne({
        where: { user_id: userId, store_id }
      });

      if (!rating) {
        return res.status(404).json({ message: "Rating not found" });
      }

      await rating.destroy();

      const avg = await Rating.findOne({
        where: { store_id },
        attributes: [[Sequelize.fn("AVG", Sequelize.col("score")), "avg"]]
      });

      return res.json({
        message: "Rating deleted",
        average: avg?.dataValues.avg
          ? Number(avg.dataValues.avg).toFixed(1)
          : null
      });

    } catch (err) {
      next(err);
    }
  },

  // ---------------------------------------------------------
  // GET A USER’S RATING FOR A STORE
  // ---------------------------------------------------------
  getUserRating: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { store_id } = req.params;

      const rating = await Rating.findOne({
        where: { user_id: userId, store_id }
      });

      return res.json({ rating });

    } catch (err) {
      next(err);
    }
  }

};
