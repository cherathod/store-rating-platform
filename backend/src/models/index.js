const Sequelize = require('sequelize');
const sequelize = require('../config/db');


const User = require('../models/user_model')(sequelize, Sequelize.DataTypes);
const Store = require('../models/store_model')(sequelize, Sequelize.DataTypes);
const Rating = require('../models/rating_model')(sequelize, Sequelize.DataTypes);


User.hasMany(Store, { foreignKey: 'owner_id', as: 'stores' });
Store.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });


User.hasMany(Rating, { foreignKey: 'user_id' });
Rating.belongsTo(User, { foreignKey: 'user_id' });


Store.hasMany(Rating, { foreignKey: 'store_id' });
Rating.belongsTo(Store, { foreignKey: 'store_id' });


module.exports = { sequelize, User, Store, Rating };