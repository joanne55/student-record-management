// courseModel.js will contain the schema and model for the course table in the database.
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/dbConfig');

const Course = sequelize.define('Course', {
    courseId: { type: DataTypes.STRING(255), primaryKey: true, allowNull: false, unique: true },
    courseName: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.STRING(255), allowNull: true }
}, {
    freezeTableName: true,
    timestamps: false, // Disable createdAt and updatedAt 
});

module.exports = Course;
