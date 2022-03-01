"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class likecomment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      likecomment.belongsTo(
        models.user,
        { foreignKey: "userId" },
        { onDelete: "cascade", hooks: true }
      );
      likecomment.belongsTo(
        models.post,
        { foreignKey: "postId" },
        { onDelete: "cascade", hooks: true }
      );
      likecomment.belongsTo(
        models.comment,
        { foreignKey: "commentId" },
        { onDelete: "cascade", hooks: true }
      );
    }
  }
  likecomment.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      commentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "likecomment",
    }
  );
  return likecomment;
};
