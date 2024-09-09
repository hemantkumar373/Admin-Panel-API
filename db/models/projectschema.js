"use strict";
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

module.exports = sequelize.define(
  "project",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: false,
    },
    assignedTo: {
      type: DataTypes.ARRAY(DataTypes.INTEGER), // Array of user IDs
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
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
    modelName: "project",
  }
);
