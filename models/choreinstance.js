'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChoreInstance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ChoreInstance.belongsToMany(models.User, {
        through: models.UserChoreInstance,
        foreignKey: 'choreInstanceId',
        otherKey: 'userId'
      });
      
      ChoreInstance.belongsTo(models.Chore, { foreignKey: 'choreId' });
      ChoreInstance.hasMany(models.UserChoreInstance, { foreignKey: 'choreInstanceId' });      
    }
  }
  ChoreInstance.init({
    choreId: DataTypes.INTEGER,
    dueDate: DataTypes.DATE,
    isComplete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ChoreInstance',
  });
  return ChoreInstance;
};