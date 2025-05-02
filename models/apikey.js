'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ApiKey extends Model {
    // ✅ This is where associations go
    static associate(models) {
      ApiKey.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  ApiKey.init({
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: DataTypes.STRING,
    lastUsedAt: DataTypes.DATE,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ApiKey',
  });

  return ApiKey;
};
