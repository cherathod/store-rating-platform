module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Store", {
        name: { type: DataTypes.STRING(100), allowNull: false },
        email: { type: DataTypes.STRING(120) },
        address: { type: DataTypes.STRING(400) }
    });
};
