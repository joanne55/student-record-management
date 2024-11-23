const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/dbConfig');

// Define User model
const User = sequelize.define('User', {
    userId: {
        type: DataTypes.STRING(255),
        primaryKey: true,
        allowNull: false,
        unique: { msg: "User ID must be unique" },
        validate: {
            notEmpty: { msg: "User ID cannot be empty" },
            len: { args: [1, 255], msg: "User ID must be between 1 and 255 characters long" }
        }
    },
    username: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: { msg: "Username must be unique" },
        validate: {
            notEmpty: { msg: "Username cannot be empty" },
            len: { args: [3, 255], msg: "Username must be between 3 and 255 characters long" }
        }
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: { msg: "Password cannot be empty" },
            len: { args: [6, 255], msg: "Password must be at least 6 characters long" }
        }
    },
    role: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: { msg: "Role cannot be empty" },
            isIn: { args: [['admin', 'lecturer', 'student']], msg: "Role must be one of the following: admin, lecturer, student" }
        }
    }
}, {
    freezeTableName: true // Prevent Sequelize from pluralizing the table name
});

module.exports = User;
