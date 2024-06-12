const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Item = sequelize.define('Item', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  starting_price: { type: DataTypes.DECIMAL, allowNull: false },
  current_price: { type: DataTypes.DECIMAL, defaultValue: DataTypes.DECIMAL },
  image_url: { type: DataTypes.STRING },
  end_time: { type: DataTypes.DATE, allowNull: false },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = Item;
