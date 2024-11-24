// services/moduleService.js
const Module = require('../models/moduleModel');
const Enrollment = require('../models/enrollmentModel');
const Contains = require('../models/containsModel');
const Teach = require('../models/teachModel');
const Course = require('../models/courseModel');

const getAllModules = async () => {
  return await Module.findAll();
};

const createModule = async (id, name, description, credits) => {
  const newModule = await Module.create({
    moduleId: id,
    moduleName: name,
    description: description,
    credit: credits
  });
  return newModule;
};

const deleteModule = async (id) => {
  const module = await Module.findByPk(id);
  if (!module) {
    throw new Error('Module not found');
  }
  await module.destroy();
};

const getModulesForStudent = async (studentId) => {
  const enrolledCourses = await Enrollment.findAll({
    where: { Sid: studentId },
    include: [{ model: Course, attributes: ['courseId'] }]
  });

  if (enrolledCourses.length === 0) {
    throw new Error('Student is not enrolled in any courses');
  }

  const courseIds = enrolledCourses.map(e => e.Course.courseId);

  return await Contains.findAll({
    where: { courseId: courseIds },
    include: [{ model: Module, attributes: ['moduleId', 'moduleName', 'description', 'credit'] }]
  });
};

const getModulesForLecturer = async (lecturerId) => {
  return await Teach.findAll({
    where: { Lid: lecturerId },
    include: [{ model: Module, attributes: ['moduleId', 'moduleName', 'description', 'credit'] }]
  });
};

module.exports = {
  getAllModules,
  createModule,
  deleteModule,
  getModulesForStudent,
  getModulesForLecturer
};
