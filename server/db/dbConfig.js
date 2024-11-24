// Configure db settings
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('', '', '', {
  host: './db/database.db',    // output db file location
  dialect: 'sqlite',
  logging: console.log,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  retry: {
    max: 3,
    match: [
      /SQLITE_BUSY/,
    ]
  },
  transactionType: 'IMMEDIATE',
  isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
});

// Export the Sequelize instance
module.exports = sequelize;
