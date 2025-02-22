'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // like belongs to a user
      Like.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      })

      // like belongs to a post
      Like.belongsTo(models.Post, {
        foreignKey: 'post_id',
        as: 'post'
      })
    }
  }
  Like.init({
    user_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};