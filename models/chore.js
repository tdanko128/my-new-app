'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Chore extends Model {
    static associate(models) {
      Chore.hasMany(models.ChoreInstance, { foreignKey: 'choreId' });
      Chore.hasMany(models.ChoreLog, { foreignKey: 'choreId' });
      Chore.hasMany(models.SubTask, { foreignKey: 'choreId' });
    }
  }

  Chore.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    frequency: DataTypes.ENUM('daily', 'weekly', 'once'),
    pointValue: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Chore',
  });

  return Chore;
};
