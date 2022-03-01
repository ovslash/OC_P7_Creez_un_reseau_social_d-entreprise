"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      comment.belongsTo(
        models.user,
        { foreignKey: "userId" },
        { onDelete: "cascade", hooks: true }
      );
      comment.belongsTo(
        models.post,
        { foreignKey: "postId" },
        { onDelete: "cascade", hooks: true }
      );
      comment.hasMany(models.likecomment);
    }
  }
  comment.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      likesCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "comment",
    }
  );
  return comment;
};
