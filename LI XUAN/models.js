const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize instance with SQLite storage
const sequelize = new Sequelize(
  '', '', '',
  {
    dialect: 'sqlite',
    storage: './db/database.db',
    logging: false
  }
);

// Define User model
const User = sequelize.define('User', {
    userId: {
        type: DataTypes.STRING(255),
        primaryKey: true,
        allowNull: false,
        unique: { msg: "User ID must be unique" },
        validate: {
            notEmpty: { msg: "User ID cannot be empty" },
            len: { args: [1, 255], msg: "User ID must be between 1 and 255 characters long" }
        }
    },
    username: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: { msg: "Username must be unique" },
        validate: {
            notEmpty: { msg: "Username cannot be empty" },
            len: { args: [3, 255], msg: "Username must be between 3 and 255 characters long" }
        }
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: { msg: "Password cannot be empty" },
            len: { args: [6, 255], msg: "Password must be at least 6 characters long" }
        }
    },
    role: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: { msg: "Role cannot be empty" },
            isIn: { args: [['admin', 'lecturer', 'student']], msg: "Role must be one of the following: admin, lecturer, student" }
        }
    }
}, { 
    freezeTableName: true // Prevent Sequelize from pluralizing the table name
});



// Define Admin model
const Admin = sequelize.define("Admin", {
    adminID: {
        type: DataTypes.STRING(255),
        primaryKey: true,
         allowNull: false,
        references: { model: User, key: 'userId' },
        validate: {
            notEmpty: { msg: "Admin ID cannot be empty" },
            async userExists(value) {
                const user = await User.findByPk(value);
                if (!user) {
                    throw new Error("Admin ID must correspond to an existing user ID");
                }
            }
        }
    },
    Fname: { type: DataTypes.STRING(255), allowNull: false },
    Lname: { type: DataTypes.STRING(255), allowNull: false }
}, { freezeTableName: true });


// Define Student model
const Student=sequelize.define('Student', {
    Sid: {
        type: DataTypes.STRING(255),
        primaryKey: true,
        allowNull: false,
        references: { model: User, key: 'userId' },
        validate: {
            notEmpty: { msg: "Student ID cannot be empty" },
            async userExists(value) {
                const user = await User.findByPk(value);
                if (!user) {
                    throw new Error("Student ID must correspond to an existing user ID");
                }
            }
        }
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
            },},

    
},
Sdob: { type: DataTypes.DATEONLY, allowNull: false },
Semail: { type: DataTypes.STRING(255), allowNull: false, unique: true }
}, { freezeTableName: true });

// Define Lecturer model
const Lecturer=  sequelize.define('Lecturer', {

    Lid: {
        type: DataTypes.STRING(255),
        primaryKey: true,
        allowNull: false,
        references: { model: User, key: 'userId' },
        validate: {
            notEmpty: { msg: "Lecturer ID cannot be empty" },
            async userExists(value) {
                const user = await User.findByPk(value);
                if (!user) {
                    throw new Error("Lecturer ID must correspond to an existing user ID");
                }
            }
        }
    },
    Lfname: { type: DataTypes.STRING(255), allowNull: false },
    Llname: { type: DataTypes.STRING(255), allowNull: false },
    Laddress: { type: DataTypes.STRING(255), allowNull: false },
    Lcontact: {   type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Contact number cannot be empty" },
            isInt: { msg: "Contact number must be a valid integer" },
            len: {
                args: [8, 8],
                msg: "Contact number must be exactly 8 digits-Singapore Contact number"
            },},

    },
    Lemail: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    Ldepartment: { type: DataTypes.STRING(255), allowNull: false }
}, { freezeTableName: true });



const Course=  sequelize.define('Course', {
    courseId: { type: DataTypes.STRING(255), primaryKey: true, allowNull: false, unique: true },
    courseName: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.STRING(255) }
}, { freezeTableName: true });

// Define Module model
const Module=  sequelize.define('Module', {
    moduleId: { type: DataTypes.STRING(255), primaryKey: true, allowNull: false, unique: true },
    moduleName: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.STRING(255) },
    credit: { type: DataTypes.INTEGER, allowNull: false }
}, { freezeTableName: true });


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



  const Teach = sequelize.define('Teach', {
    Lid: {
      type: DataTypes.STRING(255),
      references: {
        model: Lecturer,
        key: 'Lid',
      },
      onDelete: 'CASCADE',
    },
    moduleId: {
      type: DataTypes.STRING(255),
      references: {
        model: Module,
        key: 'moduleId',
      },
      onDelete: 'CASCADE',
    },
  }, { freezeTableName: true });
  

const Contains =  sequelize.define('Contains', {
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



const Result = sequelize.define('Result', {
    Sid: {
      type: DataTypes.STRING(255),
      references: {
        model: Student,
        key: 'Sid',
      },
      onDelete: 'CASCADE',
    },
    moduleId: {
      type: DataTypes.STRING(255),
      references: {
        model: Module,
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



// Define Associations between models
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


// Sync all models (including associations)
sequelize.sync({ force: true }).then(() => {
  console.log('Models synced successfully');
}).catch((err) => {
  console.error('Error syncing models:', err);
});

// Export models and sequelize instance
module.exports = { sequelize, User, Student, Admin, Lecturer, Course, Module, Enrollment, Teach, Contains, Result };
