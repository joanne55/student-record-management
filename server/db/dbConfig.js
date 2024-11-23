// Configure db settings
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('', '', '', {
  host: './db/database.db',    // output db file location
  dialect: 'sqlite',
  logging: console.log,
});

// Export the Sequelize instance
module.exports = sequelize;
