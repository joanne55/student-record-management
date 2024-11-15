const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize
const sequelize = new Sequelize('', '', '', {
    host: '../db/database.db',
    dialect: 'sqlite' 
});

// Define the Course model
const Course = sequelize.define('Course', {
    courseID: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    courseName: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING },
}, { 
    tableName: 'course',
    timestamps: false, // Disable createdAt and updatedAt
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

module.exports = Course;
