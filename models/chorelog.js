'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ChoreLog extends Model {
    static associate(models) {
      ChoreLog.belongsTo(models.User, { foreignKey: 'userId' });
      ChoreLog.belongsTo(models.Chore, { foreignKey: 'choreId' });
    }
  }

  ChoreLog.init({
    userId: DataTypes.INTEGER,
    choreId: DataTypes.INTEGER,
    dateCompleted: DataTypes.DATE,
    pointsEarned: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ChoreLog',
  });

  return ChoreLog;
};
