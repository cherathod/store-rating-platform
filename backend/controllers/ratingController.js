const { Rating } = require("../models");

exports.submitRating = async (req, res) => {
    const { store_id, rating } = req.body;

    const existing = await Rating.findOne({
        where: { user_id: req.user.id, store_id }
    });

    if (existing) {
        existing.rating = rating;
        await existing.save();
        return res.json({ message: "Rating updated" });
    }

    const newRating = await Rating.create({
        user_id: req.user.id,
        store_id,
        rating
    });

    res.json(newRating);
};
