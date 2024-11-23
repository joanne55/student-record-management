const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/dbConfig');
const User = require('./userModel');

// Define Admin model
const Admin = sequelize.define("Admin", {
    adminID: {
        type: DataTypes.STRING(255),
        primaryKey: true,
        allowNull: false,
        references: { model: 'User', key: 'userId' },       // use 'User' instead of User to avoid circular dependency and calling User before it is defined (models defined and associated in dataInit.js)
        // validate: {
        //     notEmpty: { msg: "Admin ID cannot be empty" },
        //     async userExists(value) {
        //         // const user = await User.findByPk(value);
        //         const user = await sequelize.models.User.findByPk(value);
        //         if (!user) {
        //             throw new Error("Admin ID must correspond to an existing user ID");
        //         }
        //     }
        // }
    },
    Fname: { type: DataTypes.STRING(255), allowNull: false },
    Lname: { type: DataTypes.STRING(255), allowNull: false }
}, { freezeTableName: true });

module.exports = Admin;