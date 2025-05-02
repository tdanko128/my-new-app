'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubTask extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SubTask.belongsTo(models.Chore, { foreignKey: 'choreId' });
    }
  }
  SubTask.init({
    choreId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    isComplete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'SubTask',
  });
  return SubTask;
};