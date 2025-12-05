module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    user_id: { 
      type: DataTypes.UUID, 
      allowNull: false,
      references: { model: 'users', key: 'id' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    store_id: { 
      type: DataTypes.UUID, 
      allowNull: false,
      references: { model: 'stores', key: 'id' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    score: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } }
  }, { tableName: 'ratings', timestamps: true, underscored: true });

  Rating.associate = (models) => {
    Rating.belongsTo(models.User, { foreignKey: 'user_id' });
    Rating.belongsTo(models.Store, { foreignKey: 'store_id' });
  };

  return Rating;
};
