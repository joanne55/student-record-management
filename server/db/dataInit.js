const bcrypt = require('bcryptjs');  // Import bcryptjs for hashing passwords
const sequelize = require('./dbConfig');
const models = require('../models/associations');

// Import models, create tables and insert test data into the database
async function loadData() {
    try {
        // Check if users exist first
        const users = await models.User.findAll({ where: { userId: ['s101', 's102', 'l101', 'l102', 'admin001'] } });

        // If users do not exist, create users first
        if (users.length === 0) {
            // Passwords to be hashed
            const hashedPasswordAdmin = await bcrypt.hash('admin123', 10);
            const hashedPasswordStudent1 = await bcrypt.hash('john123', 10);
            const hashedPasswordStudent2 = await bcrypt.hash('joanne123', 10);
            const hashedPasswordLecturer1 = await bcrypt.hash('david123', 10);
            const hashedPasswordLecturer2 = await bcrypt.hash('emma123', 10);

            // Create users with hashed passwords
            const userData = await Promise.all([
                // Create users: admin, students, and lecturers with hashed passwords
                models.User.create({ userId: 'admin001', username: 'Alice Johnson', password: hashedPasswordAdmin, role: 'admin' }),
                models.User.create({ userId: 's101', username: 'John Lee', password: hashedPasswordStudent1, role: 'student' }),
                models.User.create({ userId: 's102', username: 'Joanne Wang', password: hashedPasswordStudent2, role: 'student' }),
                models.User.create({ userId: 'l101', username: 'David Tan', password: hashedPasswordLecturer1, role: 'lecturer' }),
                models.User.create({ userId: 'l102', username: 'Emma Lee', password: hashedPasswordLecturer2, role: 'lecturer' })
            ]);

            // After users are created, create corresponding Admin, Student, and Lecturer records
            await Promise.all([
                models.Admin.create({
                    adminID: 'admin001', Fname: 'Alice', Lname: 'Johnson', UserId: 'admin001'
                }),
                models.Student.create({
                    Sid: 's101', Sfname: 'John', Slname: 'Lee', Sdob: new Date('1999-11-11'),
                    Semail: 'john@u.nus.edu', Scontact: '98987777', Saddress: '456 Bukit Timah Road,#07-34 Singapore 259721', UserId: 's101'
                }),
                models.Student.create({
                    Sid: 's102', Sfname: 'Joanne', Slname: 'Wang', Sdob: new Date('2000-11-11'),
                    Semail: 'joanne@u.nus.edu', Scontact: '98888877', Saddress: '789 Orchard Road,#10-11, Singapore 238883', UserId: 's102'
                }),
                models.Lecturer.create({
                    Lid: 'l101', Lfname: 'David', Llname: 'Tan', Laddress: '123 Queen Street, Singapore 189734',
                    Lcontact: '98765432', Lemail: 'david@university.edu', Ldepartment: 'Engineering', UserId: 'l101'
                }),
                models.Lecturer.create({
                    Lid: 'l102', Lfname: 'Emma', Llname: 'Lee', Laddress: '45 Bukit Timah, Singapore 258973',
                    Lcontact: '96325874', Lemail: 'emma@university.edu', Ldepartment: 'Business', UserId: 'l102'
                })
            ]);

            console.log('Users, students, lecturers, and admin created successfully.');
        }

        // await models.Course.sync({ force: true });
        // Create courses if they don't exist
        const courses = await models.Course.findAll();
        if (courses.length === 0) {
            await Promise.all([
                models.Course.create({
                    courseId: 'eng101', courseName: 'Engineering Fundamentals',
                    description: 'A course for engineering students to learn basic principles of engineering.'
                }),
                models.Course.create({
                    courseId: 'bus101', courseName: 'Business Analytics',
                    description: 'A course for students to learn the fundamentals of Business Analytics.'
                })
            ]);
            console.log('Courses created successfully.');
        }

        // Create modules if they don't exist
        const modules = await models.Module.findAll();
        if (modules.length === 0) {
            await Promise.all([
                models.Module.create({
                    moduleId: 'eng101m1', moduleName: 'Engineering Basics',
                    description: 'This module covers the basics of engineering design and analysis.', credit: 3
                }),
                models.Module.create({
                    moduleId: 'eng101m2', moduleName: 'Mechanical Systems',
                    description: 'This module introduces students to mechanical engineering systems.', credit: 3
                }),
                models.Module.create({
                    moduleId: 'bus101m1', moduleName: 'Data Analysis for Business',
                    description: 'This module covers data analysis techniques for business applications.', credit: 3
                }),
                models.Module.create({
                    moduleId: 'bus101m2', moduleName: 'Statistical Methods for Business',
                    description: 'This module introduces statistical methods in the context of business.', credit: 3
                })
            ]);
            console.log('Modules created successfully.');
        }

        // Enroll students into courses if not already enrolled
        const student1 = await models.Student.findOne({ where: { Sid: 's101' } });
        const student2 = await models.Student.findOne({ where: { Sid: 's102' } });
        const course1 = await models.Course.findOne({ where: { courseId: 'eng101' } });
        const course2 = await models.Course.findOne({ where: { courseId: 'bus101' } });

        // Enroll students in courses using the `addCourse` method
        await student1.addCourse(course1, { through: { enrolldate: new Date('2023-08-01') } });
        await student2.addCourse(course2, { through: { enrolldate: new Date('2023-08-01') } });

        console.log('Enrollments created successfully.');

        // Assign lecturers to modules if not already assigned
        const teaches = await models.Teach.findAll();
        if (teaches.length === 0) {
            await Promise.all([
                models.Teach.create({ Lid: 'l101', moduleId: 'eng101m1' }),
                models.Teach.create({ Lid: 'l101', moduleId: 'eng101m2' }),
                models.Teach.create({ Lid: 'l102', moduleId: 'bus101m1' }),
                models.Teach.create({ Lid: 'l102', moduleId: 'bus101m2' })
            ]);
            console.log('Lecturers assigned to modules successfully.');
        }

        // Assign results to students for each module they are enrolled in
        const results = await models.Result.findAll();
        if (results.length === 0) {
            await Promise.all([
                models.Result.create({ Sid: 's101', moduleId: 'eng101m1', grade: 'A' }),
                models.Result.create({ Sid: 's101', moduleId: 'eng101m2', grade: 'B' }),
                models.Result.create({ Sid: 's102', moduleId: 'bus101m1', grade: 'B' }),
                models.Result.create({ Sid: 's102', moduleId: 'bus101m2', grade: 'A' })
            ]);
            console.log('Results assigned to students successfully.');
        }

        // Add data to the 'Contains' table (Course-Module association)
        const containsData = await models.Contains.findAll();
        if (containsData.length === 0) {
            await Promise.all([
                models.Contains.create({ courseId: 'eng101', moduleId: 'eng101m1' }),
                models.Contains.create({ courseId: 'eng101', moduleId: 'eng101m2' }),
                models.Contains.create({ courseId: 'bus101', moduleId: 'bus101m1' }),
                models.Contains.create({ courseId: 'bus101', moduleId: 'bus101m2' })
            ]);
            console.log('Course-Module associations created successfully in Contains table.');
        }

        console.log('Test data loaded...');
    } catch (err) {
        console.error('Error during loadData:', err);
    }
}

// Sync all models, authenticate the connection and load test data 
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection established successfully.');
        await sequelize.sync();  // Sync all models to the database
        console.log('All models are synchronized.');
        await loadData();
        console.log('test data loaded...');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
