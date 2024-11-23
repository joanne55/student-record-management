const User = require('./userModel');    
const Student = require('./studentModel');
const Lecturer = require('./lecturerModel');
const Admin = require('./adminModel');
const Course = require('./courseModel');
const Module = require('./moduleModel');
const Enrollment = require('./enrollmentModel');
const Teach = require('./teachModel');
const Contains = require('./containsModel');
const Result = require('./resultModel');    

// Load all models and define their associations, then export for dataInit.js to use 
User.hasOne(Student, {
    foreignKey: 'userId',   // ensure the Student table has 'userId' as the FK
    onDelete: 'CASCADE',    // If the User is deleted, also delete related Student
});
User.hasOne(Lecturer, {
    foreignKey: 'userId',   // ensure the Lecturer table has 'userId' as the FK
    onDelete: 'CASCADE',    // If the User is deleted, also delete related Lecturer
});
User.hasOne(Admin, {
    foreignKey: 'userId',   // ensure the Admin table has 'userId' as the FK
    onDelete: 'CASCADE',    // If the User is deleted, also delete related Admin
});

// Reverse relationship for Student, Lecturer, and Admin to User
// Student belongs to User
Student.belongsTo(User, {
    foreignKey: 'userId',  // Foreign key in the Student table
    targetKey: 'userId',   // References the 'userId' in the User table
    onDelete: 'CASCADE',   // If the User is deleted, also delete related Student
});
// Lecturer belongs to User
Lecturer.belongsTo(User, {
    foreignKey: 'userId',  // Foreign key in the Lecturer table
    targetKey: 'userId',   // References the 'userId' in the User table
    onDelete: 'CASCADE',   // If the User is deleted, also delete related Lecturer
});
// Admin belongs to User
Admin.belongsTo(User, {
    foreignKey: 'userId',  // Foreign key in the Admin table
    targetKey: 'userId',   // References the 'userId' in the User table
    onDelete: 'CASCADE',   // If the User is deleted, also delete related Admin
});

// Define associations for other models (many-to-many relationships)
Student.belongsToMany(Course, {
    through: Enrollment,
    foreignKey: 'Sid',
    otherKey: 'courseId',
    onDelete: 'CASCADE',  // If the student is deleted, set the courseId to NULL
});
Course.belongsToMany(Student, {
    through: Enrollment,
    foreignKey: 'courseId',
    otherKey: 'Sid',
    onDelete: 'SET NULL',  // If the course is deleted, remove the enrollment records
});
// Enrollment belongs to a Course
Enrollment.belongsTo(Course, {
    foreignKey: 'courseId',
    targetKey: 'courseId',  // courseId in Enrollment points to courseId in Course
    onDelete: 'CASCADE',
});

// Enrollment belongs to a Student
Enrollment.belongsTo(Student, {
    foreignKey: 'Sid',
    targetKey: 'userId', // Sid in Enrollment points to userId in Student
    onDelete: 'CASCADE',
});


Lecturer.belongsToMany(Module, {
    through: Teach,
    foreignKey: 'Lid',
    otherKey: 'moduleId',
    onDelete: 'SET NULL',  // If the lecturer is deleted, set the moduleId to NULL
});
Module.belongsToMany(Lecturer, {
    through: Teach,
    foreignKey: 'moduleId',
    otherKey: 'Lid',
    onDelete: 'CASCADE',  // If the module is deleted, set the lecturerId to NULL
});
Teach.belongsTo(Lecturer, {
    foreignKey: 'Lid',
    targetKey: 'Lid',  // Lid in Teach points to Lid in Lecturer
    onDelete: 'SET NULL',  // If the lecturer is deleted, set the moduleId to NULL
});

Teach.belongsTo(Module, {
    foreignKey: 'moduleId',
    targetKey: 'moduleId',  // moduleId in Teach points to moduleId in Module
    onDelete: 'CASCADE',  // If the module is deleted, remove the Teach records
});


Course.belongsToMany(Module, {
    through: Contains,
    foreignKey: 'courseId',
    otherKey: 'moduleId',
    onDelete: 'CASCADE',  // If the course is deleted, remove the Contains records
});
Module.belongsToMany(Course, {
    through: Contains,
    foreignKey: 'moduleId',
    otherKey: 'courseId',
    onDelete: 'CASCADE',  // If the module is deleted, remove the Contains records
});

Contains.belongsTo(Course, {
    foreignKey: 'courseId',
    targetKey: 'courseId',  // courseId in Contains points to courseId in Course
    onDelete: 'CASCADE',  // If the course is deleted, remove the Contains records
});
Contains.belongsTo(Module, {
    foreignKey: 'moduleId',
    targetKey: 'moduleId',  // moduleId in Contains points to moduleId in Module
    onDelete: 'CASCADE',  // If the module is deleted, remove the Contains records
});


Student.belongsToMany(Module, {
    through: Result,
    foreignKey: 'Sid',
    otherKey: 'moduleId',
    onDelete: 'CASCADE',  // If the student is deleted, remove the result records
});
Module.belongsToMany(Student, {
    through: Result,
    foreignKey: 'moduleId',
    otherKey: 'Sid',
    onDelete: 'NO ACTION',  // Don't delete results when the module is deleted
});

Result.belongsTo(Student, {
    foreignKey: 'Sid',
    targetKey: 'userId',  // Sid in Result points to userId in Student
    onDelete: 'CASCADE',  // If the student is deleted, remove the result records
});

Result.belongsTo(Module, {
    foreignKey: 'moduleId',
    targetKey: 'moduleId',  // moduleId in Result points to moduleId in Module
    onDelete: 'NO ACTION',  // Don't delete results when the module is deleted
});

module.exports = {
    User,
    Student,
    Lecturer,
    Admin,
    Course,
    Module,
    Enrollment,
    Teach,
    Contains,
    Result
};