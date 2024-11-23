const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/dbConfig');

const Result = sequelize.define('Result', {
    Sid: {
        type: DataTypes.STRING(255),
        references: {
            model: 'Student',
            key: 'Sid',
        },
        onDelete: 'CASCADE',
    },
    moduleId: {
        type: DataTypes.STRING(255),
        references: {
            model: 'Module',
            key: 'moduleId',
        },
        onDelete: 'NO ACTION',
    },
    grade: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
            // Custom validation to ensure the grade is one of A, B, C, D, E, F
            isIn: {
                args: [['A', 'B', 'C', 'D', 'E', 'F']],
                msg: 'Grade must be one of the following values: A, B, C, D, E, F',
            },
        },
    },
}, { freezeTableName: true });

module.exports = Result;
