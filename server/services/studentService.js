const Student = require('../models/studentModel');
const User = require('../models/userModel')
const bcrypt = require('bcryptjs');


// Fetch all students
const getAllStudents = async () => {
  const students = await Student.findAll();
  return students;
};

// Add a new student
const addStudent = async ({ id, username, password, fname, lname, address, contact, dob, email }) => {
  // Check if the user already exists
  console.log('Username:', username);  // Check if the username is undefined

  if (!username) {
    throw new Error('Username is required');  // Ensure it's not undefined
  }
  
  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) {
    throw new Error('Username already exists');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the User record
  const newUser = await User.create({
    userId: id,
    username,
    password: hashedPassword,
    role: 'student',
  });

  // Create the Student record
  const newStudent = await Student.create({
    Sid: newUser.userId,
    Sfname: fname,
    Slname: lname,
    Saddress: address,
    Scontact: contact,
    Semail: email,
    Sdob: dob,
  });

  return { user: newUser, student: newStudent };
};

// Update student details
const updateStudentDetails = async (studentId, { Saddress, Scontact, Semail }) => {
  const student = await Student.findOne({ where: { Sid: studentId } });
  if (!student) {
    throw new Error('Student not found');
  }

  const updatedStudent = await student.update({
    Saddress: Saddress || student.Saddress,
    Scontact: Scontact || student.Scontact,
    Semail: Semail || student.Semail,
  });

  return updatedStudent;
};

// Delete a student and associated user
const deleteStudent = async (id) => {
  const student = await Student.findByPk(id);
  if (!student) {
    throw new Error('Student not found');
  }

  await student.destroy();
  await User.destroy({ where: { userId: student.Sid } });
};

module.exports = {
  getAllStudents,
  addStudent,
  updateStudentDetails,
  deleteStudent,
};
