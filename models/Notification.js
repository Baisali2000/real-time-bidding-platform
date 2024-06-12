const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Notification = sequelize.define('Notification', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
  message: { type: DataTypes.STRING, allowNull: false },
  is_read: { type: DataTypes.BOOLEAN, defaultValue: false },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = Notification;
