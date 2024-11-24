// services/lecturerService.js
const Lecturer = require('../models/lecturerModel');
const User = require('../models/userModel')
const bcrypt = require('bcryptjs');

const getAllLecturers = async () => {
  return await Lecturer.findAll();
};

const addLecturerAndUser = async (id, username, password, fname, lname, address, contact, email, department) => {
  // Check if username already exists
  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) {
    throw new Error('Username already exists');
  }

  // Step 1: Create the User record for the lecturer
  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
  const newUser = await User.create({
    userId: id,         // Use the same ID for both User and Lecturer
    username: username,
    password: hashedPassword,
    role: 'lecturer'     // Set role to 'lecturer'
  });

  // Step 2: Create the Lecturer record using the same ID
  const newLecturer = await Lecturer.create({
    Lid: newUser.userId, // Link the Lecturer's ID to the User's ID (userId)
    Lfname: fname,
    Llname: lname,
    Laddress: address,
    Lcontact: contact,
    Lemail: email,
    Ldepartment: department
  });

  return {
    user: newUser,    // Newly created user
    lecturer: newLecturer  // Newly created lecturer
  };
};

const deleteLecturer = async (id) => {
  const lecturer = await Lecturer.findByPk(id);
  if (!lecturer) {
    throw new Error('Lecturer not found');
  }

  // Delete the lecturer record
  await lecturer.destroy();

  // Optionally, delete the associated user record if the lecturer is deleted
  await User.destroy({ where: { userId: lecturer.Lid } });
};

module.exports = {
  getAllLecturers,
  addLecturerAndUser,
  deleteLecturer
};
