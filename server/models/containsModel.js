const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/dbConfig');
const Course = require('./courseModel');
const Module = require('./moduleModel');

const Contains = sequelize.define('Contains', {
    moduleId: {
        type: DataTypes.STRING(255),
        references: {
            model: Module,
            key: 'moduleId',
        },
        onDelete: 'CASCADE',
    },
    courseId: {
        type: DataTypes.STRING(255),
        references: {
            model: Course,
            key: 'courseId',
        },
        onDelete: 'CASCADE',
    },
}, { freezeTableName: true });

module.exports = Contains;
