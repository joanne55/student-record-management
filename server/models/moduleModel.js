const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/dbConfig');

// Define Module model
const Module = sequelize.define('Module', {
    moduleId: { type: DataTypes.STRING(255), primaryKey: true, allowNull: false, unique: true },
    moduleName: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.STRING(255) },
    credit: { type: DataTypes.INTEGER, allowNull: false }
}, { freezeTableName: true });

module.exports = Module;
