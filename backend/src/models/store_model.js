module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define('Store', {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    name: { type: DataTypes.STRING(255), allowNull: false },
    email: { type: DataTypes.STRING(255) },
    address: { type: DataTypes.STRING(400) },
    owner_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users', // table name of User
        key: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }
  }, { tableName: 'stores', timestamps: true, underscored: true });

  Store.associate = (models) => {
    Store.belongsTo(models.User, { foreignKey: 'owner_id', as: 'owner' });
    Store.hasMany(models.Rating, { foreignKey: 'store_id' });
  };

  return Store;
};
