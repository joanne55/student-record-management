const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize
const sequelize = new Sequelize('', '', '', {
    host: '../db/database.db',
    dialect: 'sqlite' 
});

// Define the Lecturer model
const Lecturer = sequelize.define('Lecturer', {
    lecturerID: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    Fname: { type: DataTypes.STRING, allowNull: false },
    Lname: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING },
    contact: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    department: { type: DataTypes.STRING },
}, { 
    tableName: 'lecturer',
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

module.exports = Lecturer;
