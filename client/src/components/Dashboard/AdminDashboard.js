// client/src/components/Dashboard/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { data } from '../../services/api';
import DataTable from '../Tables/DataTable';
import { StudentForm, CourseForm } from '../Forms';

const AdminDashboard = () => {
  const [view, setView] = useState('students');
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadData();
  }, [view]);

  const loadData = async () => {
    const response = await data.getAll(view);
    setItems(response.data);
  };

  return (
    <div>
      <nav>
        <button onClick={() => setView('students')}>Students</button>
        <button onClick={() => setView('courses')}>Courses</button>
        <button onClick={() => setView('lecturers')}>Lecturers</button>
      </nav>

      <DataTable 
        data={items} 
        onDelete={(id) => data.delete(view, id).then(loadData)}
      />
      
      {view === 'students' && <StudentForm onSubmit={loadData} />}
      {view === 'courses' && <CourseForm onSubmit={loadData} />}
    </div>
  );
};