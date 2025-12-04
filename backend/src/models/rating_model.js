module.exports = (sequelize, DataTypes) => {
const Rating = sequelize.define('Rating', {
id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
user_id: { type: DataTypes.UUID, allowNull: false },
store_id: { type: DataTypes.UUID, allowNull: false },
score: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } }
}, { tableName: 'ratings', timestamps: true, underscored: true, indexes: [{ unique: true, fields: ['user_id', 'store_id'] }] });


return Rating;
};