const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/config.json');  // Load config.json

// Get the environment (default to 'development' if not set)
const env = process.env.NODE_ENV || 'development';
const configEnv = config[env];  // Select the config for the current environment

// Create a Sequelize instance using the selected environment's configuration
const sequelize = new Sequelize(configEnv.database, configEnv.username, configEnv.password, {
  host: configEnv.host,
  dialect: configEnv.dialect,
  logging: false,  // Set to true if you want to see SQL queries in the console
});

const db = {};

// Read all files in the models directory and import them
fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js') // Ignore index.js file
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes); // Import model
    db[model.name] = model;  // Add model to db object
  });

// Set up associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db); // Call associate if it exists
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;