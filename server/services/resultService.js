// services/gradesService.js
const Result = require('../models/resultModel');
const Module = require('../models/moduleModel');
const Teach = require('../models/teachModel');

const getGradesForStudent = async (studentId) => {
  return await Result.findAll({
    where: { Sid: studentId },
    include: {
      model: Module,
      attributes: ['moduleId', 'moduleName'], // Include module details
    },
  });
};

const addOrUpdateGrade = async (lecturerId, studentId, moduleId, grade) => {
  // Check if the lecturer teaches the module
  const teach = await Teach.findOne({ where: { Lid: lecturerId, moduleId } });

  if (!teach) {
    throw new Error('You are not authorized to assign grades for this module.');
  }

  // Check if the student is enrolled in the module
  const result = await Result.findOne({ where: { Sid: studentId, moduleId } });

  if (!result) {
    throw new Error('Student is not enrolled in this module.');
  }

  // Update the grade if it exists, otherwise create a new entry
  result.grade = grade;
  await result.save();

  return result;
};

module.exports = {
  getGradesForStudent,
  addOrUpdateGrade,
};
