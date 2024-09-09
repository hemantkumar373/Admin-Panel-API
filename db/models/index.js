'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

// Ensure the config file path is correct
const configPath = path.resolve(__dirname, '../../config/config.js');
const config = require(configPath)[env];
const db = {};

let sequelize;

try {
  if (config.use_env_variable) {
    // Check if the environment variable is properly defined
    const dbUrl = process.env[config.use_env_variable];
    if (!dbUrl) {
      throw new Error(`Environment variable ${config.use_env_variable} is not set`);
    }
    sequelize = new Sequelize(dbUrl, config);
  } else {
    sequelize = new Sequelize(config.database, config.username, config.password, {
      host: config.host,
      dialect: config.dialect,
    });
  }
} catch (error) {
  console.error('Error initializing Sequelize:', error);
  process.exit(1); // Exit the process with a failure code
}

// Read and initialize models
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    try {
      const model = require(path.join(__dirname, file))(sequelize, DataTypes);
      db[model.name] = model;
    } catch (error) {
      console.error(`Error loading model ${file}:`, error);
    }
  });

// Set up associations if defined in models
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    try {
      db[modelName].associate(db);
    } catch (error) {
      console.error(`Error setting up associations for model ${modelName}:`, error);
    }
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
