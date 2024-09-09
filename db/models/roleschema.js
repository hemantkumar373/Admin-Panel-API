"use strict";
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

module.exports = sequelize.define(
  "role",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.ENUM("admin", "manager", "employee"),
      allowNull: false,
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.STRING), // Assuming array of permissions
      allowNull: true,
      defaultValue: [],
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    paranoid: true, // used for soft deleting data
    freezeTableName: true,
    modelName: "role",
  }
);
