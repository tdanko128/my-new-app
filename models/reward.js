'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reward extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Reward.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    cost: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Reward',
  });

  Reward.associate = function(models) {
    // Optional: You can add User.hasMany(Reward) or similar later
  };
  
  return Reward;
};