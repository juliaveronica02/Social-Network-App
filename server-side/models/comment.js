'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // comment belongs to a user
      Comment.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      })

      // comment belongs to a post
      Comment.belongsTo(models.Post, {
        foreignKey: 'post_id',
        as: 'post'
      })
    }
  }
  Comment.init({
    user_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};