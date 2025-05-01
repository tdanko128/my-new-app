'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Chore.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    frequency: DataTypes.ENUM('daily', 'weekly', 'once'),
    pointValue: DataTypes.INTEGER,
    assignedTo: DataTypes.INTEGER,
    isComplete: DataTypes.BOOLEAN,
    dueDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Chore',
  });

  Chore.associate = function(models) {
    Chore.belongsTo(models.User, { foreignKey: 'assignedTo' });
    Chore.hasMany(models.ChoreLog, { foreignKey: 'choreId' });
  };
  
  return Chore;
};