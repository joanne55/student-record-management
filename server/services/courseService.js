// services/courseService.js
const Course = require('../models/courseModel');

const getAllCourses = async () => {
  return await Course.findAll();
};

const addCourse = async (courseId, name, description) => {
  return await Course.create({
    courseId,
    courseName: name,
    description
  });
};

const deleteCourse = async (id) => {
  const course = await Course.findByPk(id);
  if (!course) {
    throw new Error('Course not found');
  }
  await course.destroy();
};

module.exports = {
  getAllCourses,
  addCourse,
  deleteCourse
};
