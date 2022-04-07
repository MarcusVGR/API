'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    
    static associate(models) {
      Orders.belongsTo(models.Carts, {
        foreignKey: 'cart_id'
      })
    }
  }
  Orders.init({
    status: DataTypes.STRING,
    cart_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};