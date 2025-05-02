'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // New chore system associations
      User.belongsToMany(models.ChoreInstance, {
        through: models.UserChoreInstance,
        foreignKey: 'userId',
        otherKey: 'choreInstanceId'
      });

      User.hasMany(models.UserChoreInstance, { foreignKey: 'userId' });

      // Existing associations
      User.hasMany(models.ChoreLog, { foreignKey: 'userId' });
      User.hasMany(models.ApiKey, { foreignKey: 'userId' });
    }
  }

  User.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    role: DataTypes.ENUM('admin', 'child'),
    settings: DataTypes.JSONB,
    points: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
