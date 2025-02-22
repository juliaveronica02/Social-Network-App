'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Relationship extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // has two foreign keys for followers and following are both User models
      Relationship.belongsTo(models.User, {
        foreignKey: 'followers',
        as: 'followerUser'
      })

      Relationship.belongsTo(models.User, {
        foreignKey: 'following',
        as: 'followingUser'
      })
    }
  }
  Relationship.init({
    followers: {type: DataTypes.INTEGER, allowNull: false},
    following: {type: DataTypes.INTEGER, allowNull: false}
  }, {
    sequelize,
    modelName: 'Relationship',
  });
  return Relationship;
};