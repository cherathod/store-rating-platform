const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const User = require("./User")(sequelize, Sequelize.DataTypes);
const Store = require("./Store")(sequelize, Sequelize.DataTypes);
const Rating = require("./Rating")(sequelize, Sequelize.DataTypes);

// RELATIONS
User.hasMany(Store, { foreignKey: "user_id" });
Store.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Rating, { foreignKey: "user_id" });
Rating.belongsTo(User, { foreignKey: "user_id" });

Store.hasMany(Rating, { foreignKey: "store_id" });
Rating.belongsTo(Store, { foreignKey: "store_id" });

module.exports = { sequelize, User, Store, Rating };
