const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize
const sequelize = new Sequelize('', '', '', {
    host: '../db/database.db',
    dialect: 'sqlite' 
});

// Define the Result model
const Result = sequelize.define('Result', {
    studentID: { type: DataTypes.INTEGER, allowNull: false },
    moduleID: { type: DataTypes.INTEGER, allowNull: false },
    grade: { type: DataTypes.STRING, allowNull: false }
}, { 
    tableName: 'result',
    timestamps: false, // No createdAt or updatedAt columns
});

// Sync the model with the database
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection established successfully.');
        await sequelize.sync(); // This will sync the model to the database.
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();


module.exports = Result;
