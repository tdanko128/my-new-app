'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChoreLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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

  ChoreLog.associate = function(models) {
    ChoreLog.belongsTo(models.User, { foreignKey: 'userId' });
    ChoreLog.belongsTo(models.Chore, { foreignKey: 'choreId' });
  };
  
  return ChoreLog;
};