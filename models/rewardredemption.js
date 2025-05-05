'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RewardRedemption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RewardRedemption.belongsTo(models.User, { foreignKey: 'userId' });
      RewardRedemption.belongsTo(models.Reward, { foreignKey: 'rewardId' });
      RewardRedemption.belongsTo(models.User, { foreignKey: 'adminId', as: 'admin' });
    }    
  }
  RewardRedemption.init({
    userId: DataTypes.INTEGER,
    rewardId: DataTypes.INTEGER,
    status: DataTypes.ENUM('pending', 'approved', 'rejected'),
    requestedAt: DataTypes.DATE,
    approvedAt: DataTypes.DATE,
    adminId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RewardRedemption',
  });
  return RewardRedemption;
};