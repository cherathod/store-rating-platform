module.exports = (sequelize, DataTypes) => {
const Store = sequelize.define('Store', {
id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
name: { type: DataTypes.STRING(255), allowNull: false },
email: { type: DataTypes.STRING(255) },
address: { type: DataTypes.STRING(400) }
}, { tableName: 'stores', timestamps: true, underscored: true });


return Store;
};