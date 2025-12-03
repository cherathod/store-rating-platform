const { Sequelize } = require("sequelize");
const config = require("./config.json");

const env = "development";
const dbConfig = config[env];

const sequelize = new Sequelize(
    dbConfig.store_rating,
    dbConfig.root,
    dbConfig.root,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect
    }
);

module.exports = sequelize;
