'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User can have many posts
      User.hasMany(models.Post, {
        foreignKey: 'user_id',
        as: 'posts'
      })

      // user can have many comments
      User.hasMany(models.Comment, {
        foreignKey: 'user_id',
        as: 'comments'
      })

      // user can have many likes
      User.hasMany(models.Like, {
        foreignKey: 'user_id',
        as: 'likes'
      })

      // many to many relationship with other users (followers and following)
      User.belongsToMany(models.User, {
        through: models.Relationship,
        as: 'following',
        foreignKey: 'followers'
      })

      User.belongsToMany(models.User, {
        through: models.Relationship,
        as: 'followers',
        foreignKey: 'following'
      })

    }
  }
  User.init({
    user_id: DataTypes.INTEGER,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    profile_picture: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};