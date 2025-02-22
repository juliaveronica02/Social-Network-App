'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // post belongs to a user
      Post.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      })

      // post can have many comments
      Post.hasMany(models.Comment, {
        foreignKey: 'post_id',
        as: 'comments'
      })

      // post can have many likes
      Post.hasMany(models.Like, {
        foreignKey: 'post_id',
        as: 'likes'
      })

    }
  }
  Post.init({
    user_id: DataTypes.INTEGER,
    description: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};