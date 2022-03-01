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
      user.hasMany(models.post);
      user.hasMany(models.comment);
      user.hasMany(models.likepost);
      user.hasMany(models.likecomment);
    }
  }
  user.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        //validate: {
        //    is: REGEX
        //}
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        //validate: {
        //    is: REGEX
        //}
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profession: DataTypes.STRING,
      userDescription: DataTypes.STRING,
      profilePhoto: DataTypes.STRING,
      admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};