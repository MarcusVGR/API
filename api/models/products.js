'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    
    static associate(models) {
      Products.hasMany(models.Carts_items, {
        foreignKey: 'product_id'
      })
    }
  }
  Products.init({
    name: DataTypes.STRING,
    price: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};