'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carts_items extends Model {
    
    static associate(models) {
      Carts_items.belongsTo(models.Products, {
        foreignKey: 'product_id'
      })
      Carts_items.belongsTo(models.Carts, {
        foreignKey: 'cart_id'
      })
    }
  }
  Carts_items.init({
    cart_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    total: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Carts_items',
  });
  return Carts_items;
};