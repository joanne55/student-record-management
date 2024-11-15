const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize
const sequelize = new Sequelize('', '', '', {
    host: '../db/database.db',
    dialect: 'sqlite' 
});

// Define the Student model
const Student = sequelize.define('Student', {
    Fname: { type: DataTypes.STRING, allowNull: false },
    Lname: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING },
    contact: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    DOB: { type: DataTypes.DATE },
    enrollDate: { type: DataTypes.DATE },
    courseID: { type: DataTypes.INTEGER }
}, { tableName: 'student', timestamps: false });

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

module.exports = Student;
