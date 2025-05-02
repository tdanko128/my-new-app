'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserChoreInstance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserChoreInstance.init({
    userId: DataTypes.INTEGER,
    choreInstanceId: DataTypes.INTEGER,
    isComplete: DataTypes.BOOLEAN,
    assignedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UserChoreInstance',
  });
  return UserChoreInstance;
};