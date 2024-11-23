const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/dbConfig');
const Course = require('./courseModel');
const Student = require('./studentModel');

const Enrollment = sequelize.define('Enrollment', {
    Sid: {
        type: DataTypes.STRING(255),
        references: {
            model: Student,
            key: 'Sid',
        },
        onDelete: 'CASCADE',
    },
    courseId: {
        type: DataTypes.STRING(255),
        references: {
            model: Course,
            key: 'courseId',
        },
        onDelete: 'SET NULL',
    },
    enrolldate: {
        type: DataTypes.DATEONLY,
        defaultValue: sequelize.NOW,
    }
}, { freezeTableName: true });

module.exports = Enrollment;