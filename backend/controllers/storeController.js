const { Store, Rating, User } = require("../models");

exports.createStore = async (req, res) => {
    const store = await Store.create(req.body);
    res.json(store);
};

exports.getAllStores = async (req, res) => {
    const stores = await Store.findAll();
    res.json(stores);
};

exports.getStoreRatings = async (req, res) => {
    const { id } = req.params;

    const ratings = await Rating.findAll({
        where: { store_id: id },
        include: [{ model: User, attributes: ["name", "email"] }]
    });

    res.json(ratings);
};
