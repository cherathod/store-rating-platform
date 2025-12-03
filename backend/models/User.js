module.exports = (sequelize, DataTypes) => {
    return sequelize.define("User", {
        name: { type: DataTypes.STRING(60), allowNull: false },
        email: { type: DataTypes.STRING(120), allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        address: { type: DataTypes.STRING(400) },
        role: { 
            type: DataTypes.ENUM("admin", "user", "store_owner"),
            defaultValue: "user"
        }
    });
};
