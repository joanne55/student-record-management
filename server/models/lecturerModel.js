const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/dbConfig');

// Define Lecturer model
const Lecturer = sequelize.define('Lecturer', {
    Lid: {
        type: DataTypes.STRING(255),
        primaryKey: true,
        allowNull: false,
        references: { model: 'User', key: 'userId' },
        // validate: {
        //     notEmpty: { msg: "Lecturer ID cannot be empty" },
        //     async userExists(value) {
        //         const user = await sequelize.models.User.findByPk(value);
        //         if (!user) {
        //             throw new Error("Lecturer ID must correspond to an existing user ID");
        //         }
        //     }
        // }
    },
    Lfname: { type: DataTypes.STRING(255), allowNull: false },
    Llname: { type: DataTypes.STRING(255), allowNull: false },
    Laddress: { type: DataTypes.STRING(255), allowNull: false },
    Lcontact: {
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
    Lemail: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    Ldepartment: { type: DataTypes.STRING(255), allowNull: false }
}, { freezeTableName: true });

module.exports = Lecturer;
