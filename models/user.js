"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.message, { foreignKey: "user_id" });
    }
  }
  user.init(
    {
      email: { unique: true, type: DataTypes.STRING },
      password: DataTypes.TEXT,
      name: DataTypes.STRING,
      image: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
