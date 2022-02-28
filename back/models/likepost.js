"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class likepost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      likepost.belongsTo(
        models.User,
        { foreignKey: "userId" },
        { onDelete: "cascade", hooks: true }
      );
      likepost.belongsTo(
        models.Post,
        { foreignKey: "postId" },
        { onDelete: "cascade", hooks: true }
      );
    }
  }
  likepost.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "likepost",
    }
  );
  return likepost;
};
