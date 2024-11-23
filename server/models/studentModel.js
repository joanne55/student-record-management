const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/dbConfig');

// Define Student model
const Student = sequelize.define('Student', {
    Sid: {
        type: DataTypes.STRING(255),
        primaryKey: true,
        allowNull: false,
        references: { model: 'User', key: 'userId' },
        // validate: {
        //     notEmpty: { msg: "Student ID cannot be empty" },
        //     async userExists(value) {
        //         const user = await sequelize.models.User.findByPk(value);
        //         if (!user) {
        //             throw new Error("Student ID must correspond to an existing user ID");
        //         }
        //     }
        // }
    },
    Sfname: { type: DataTypes.STRING(255), allowNull: false },
    Slname: { type: DataTypes.STRING(255), allowNull: false },
    Saddress: { type: DataTypes.STRING(255), allowNull: false },
    Scontact: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Contact number cannot be empty" },
            isInt: { msg: "Contact number must be a valid integer" },
            len: {
                args: [8, 8],
                msg: "Contact number must be exactly 8 digits-Singapore Contact number"
            },
        },
    },
    Sdob: { type: DataTypes.DATEONLY, allowNull: false },
    Semail: { type: DataTypes.STRING(255), allowNull: false, unique: true }
}, { freezeTableName: true });

module.exports = Student;
