const Sequelize = require('sequelize');
const sequelize = require('../config/database');


const User = require('./user.model')(sequelize, Sequelize.DataTypes);
const Store = require('./store.model')(sequelize, Sequelize.DataTypes);
const Rating = require('./rating.model')(sequelize, Sequelize.DataTypes);


User.hasMany(Store, { foreignKey: 'owner_id', as: 'stores' });
Store.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });


User.hasMany(Rating, { foreignKey: 'user_id' });
Rating.belongsTo(User, { foreignKey: 'user_id' });


Store.hasMany(Rating, { foreignKey: 'store_id' });
Rating.belongsTo(Store, { foreignKey: 'store_id' });


module.exports = { sequelize, User, Store, Rating };