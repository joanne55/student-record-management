const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/dbConfig');

const Teach = sequelize.define('Teach', {
    Lid: {
        type: DataTypes.STRING(255),
        references: {
            model: 'Lecturer',
            key: 'Lid',
        },
        onDelete: 'CASCADE',
    },
    moduleId: {
        type: DataTypes.STRING(255),
        references: {
            model: 'Module',
            key: 'moduleId',
        },
        onDelete: 'CASCADE',
    },
}, { freezeTableName: true });

module.exports = Teach;

