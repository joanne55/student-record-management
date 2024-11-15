const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize
const sequelize = new Sequelize('', '', '', {
    host: '../db/database.db',
    dialect: 'sqlite' 
});

// Define the Module model
const Module = sequelize.define('Module', {
    moduleID: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    moduleName: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING },
    credits: { type: DataTypes.INTEGER, allowNull: false },
    lecturerID: { type: DataTypes.INTEGER, allowNull: false },
    courseID: { type: DataTypes.INTEGER, allowNull: false },
}, { 
    tableName: 'module',
    timestamps: false, // Disable createdAt and updatedAt columns
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

module.exports = Module;
