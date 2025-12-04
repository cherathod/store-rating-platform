const bcrypt = require('bcrypt');


module.exports = (sequelize, DataTypes) => {
const User = sequelize.define('User', {
id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
name: { type: DataTypes.STRING(60), allowNull: false },
email: { type: DataTypes.STRING(255), allowNull: false, unique: true, validate: { isEmail: true } },
password_hash: { type: DataTypes.STRING(255), allowNull: false },
address: { type: DataTypes.STRING(400) },
role: { type: DataTypes.ENUM('admin', 'user', 'store_owner'), defaultValue: 'user' }
}, { tableName: 'users', timestamps: true, underscored: true });


User.prototype.validatePassword = function(password) {
return bcrypt.compare(password, this.password_hash);
};


return User;
};