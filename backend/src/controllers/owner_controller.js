const { Store, Rating, User, Sequelize } = require('../models');

module.exports = {

  // ---------------------------------------------------------
  // STORE OWNER DASHBOARD: List all ratings for the owner's store
  // ---------------------------------------------------------
  getMyStoreRatings: async (req, res, next) => {
    try {
      const ownerId = req.user.id;

      const store = await Store.findOne({
        where: { owner_id: ownerId }
      });

      if (!store) {
        return res.status(404).json({ message: "Store not found for this owner" });
      }

      // Get ratings with user info
      const ratings = await Rating.findAll({
        where: { store_id: store.id },
        include: [
          {
            model: User,
            attributes: ['id', 'name', 'email', 'address']
          }
        ],
        order: [['createdAt', 'DESC']]
      });

      // Calculate average rating
      const avg = await Rating.findOne({
        where: { store_id: store.id },
        attributes: [[Sequelize.fn("AVG", Sequelize.col("score")), "avg"]]
      });

      return res.json({
        store: store.toJSON(),
        averageRating: avg?.dataValues.avg
          ? Number(avg.dataValues.avg).toFixed(1)
          : null,
        ratings
      });

    } catch (err) {
      next(err);
    }
  },

  // ---------------------------------------------------------
  // STORE OWNER: Get only average rating
  // ---------------------------------------------------------
  getMyStoreAverage: async (req, res, next) => {
    try {
      const ownerId = req.user.id;

      const store = await Store.findOne({
        where: { owner_id: ownerId }
      });

      if (!store) {
        return res.status(404).json({ message: "Store not found" });
      }

      const avg = await Rating.findOne({
        where: { store_id: store.id },
        attributes: [[Sequelize.fn("AVG", Sequelize.col("score")), "avg"]]
      });

      return res.json({
        storeId: store.id,
        averageRating: avg?.dataValues.avg
          ? Number(avg.dataValues.avg).toFixed(1)
          : null
      });

    } catch (err) {
      next(err);
    }
  }

};
