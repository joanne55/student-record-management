import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Create the context
const StudentRecordContext = createContext();

// Custom hook for consuming the context
export const useStudentRecord = () => useContext(StudentRecordContext);

export const StudentRecordProvider = ({ children }) => {
  // State for student data, course data, etc.
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [grades, setGrades] = useState([]);
  const [userRole, setUserRole] = useState(null);  // 'admin', 'lecturer', 'student'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch data based on the role
  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: studentsData } = await axios.get('/api/student');
      const { data: coursesData } = await axios.get('/api/course');
      const { data: lecturersData } = await axios.get('/api/lecturer');
      const { data: gradesData } = await axios.get('/api/grade');
      setStudents(studentsData);
      setCourses(coursesData);
      setLecturers(lecturersData);
      setGrades(gradesData);
      setError(null);
    } catch (err) {
      setError(err.response ? err.response.data : 'Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Functions for CRUD operations based on role
  const createRecord = async (type, payload) => {
    if (userRole !== 'admin' && (type !== 'grades' || userRole !== 'lecturer')) {
      setError('Access denied');
      return;
    }
    try {
      await axios.post(`/api/${type}`, payload);
      fetchData();
    } catch (err) {
      setError(err.response ? err.response.data : 'Error creating record');
    }
  };

  const updateRecord = async (type, id, payload) => {
    if (userRole !== 'admin' && (type !== 'grades' || userRole !== 'lecturer')) {
      setError('Access denied');
      return;
    }
    try {
      await axios.put(`/api/${type}/${id}`, payload);
      fetchData();
    } catch (err) {
      setError(err.response ? err.response.data : 'Error updating record');
    }
  };

  const deleteRecord = async (type, id) => {
    if (userRole !== 'admin') {
      setError('Access denied');
      return;
    }
    try {
      await axios.delete(`/api/${type}/${id}`);
      fetchData();
    } catch (err) {
      setError(err.response ? err.response.data : 'Error deleting record');
    }
  };

  return (
    <StudentRecordContext.Provider
      value={{
        students,
        courses,
        lecturers,
        grades,
        userRole,
        setUserRole,
        loading,
        error,
        createRecord,
        updateRecord,
        deleteRecord,
      }}
    >
      {children}
    </StudentRecordContext.Provider>
  );
};
