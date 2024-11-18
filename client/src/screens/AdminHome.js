import React, { useState } from 'react';
import ManageStudents from './ManageStudents';
import ManageLecturers from './ManageLecturers';
import ManageCourses from './ManageCourses';
import ManageModules from './ManageModules';

const AdminHome = ({ onLogout }) => {
  const [activeScreen, setActiveScreen] = useState('Home'); // Tracks the current screen

  // Components for each screen
  const HomeScreen = () => <h1>Welcome to Admin Home</h1>;

  // Function to render the active screen
  const renderScreen = () => {
      switch (activeScreen) {
          case 'Home':
              return <HomeScreen />;
          case 'Manage Students':
              return <ManageStudents />;
          case 'Manage Lecturers':
              return <ManageLecturers />;
          case 'Manage Courses':
              return <ManageCourses />;
          case 'Manage Modules':
              return <ManageModules />;
          default:
              return <HomeScreen />;
      }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
        {/* Sidebar Navigation */}
        <div style={{ width: '20%', backgroundColor: '#f5f5f5', padding: '10px' }}>
            <h2>Navigation</h2>
            <button
                style={styles.navButton}
                onClick={() => setActiveScreen('Home')}
            >
                Home
            </button>
            <button
                style={styles.navButton}
                onClick={() => setActiveScreen('Manage Students')}
            >
                Manage Students
            </button>
            <button
                style={styles.navButton}
                onClick={() => setActiveScreen('Manage Lecturers')}
            >
                Manage Lecturers
            </button>
            <button
                style={styles.navButton}
                onClick={() => setActiveScreen('Manage Courses')}
            >
                Manage Courses
            </button>
            <button
                style={styles.navButton}
                onClick={() => setActiveScreen('Manage Modules')}
            >
                Manage Modules
            </button>
            <button
                style={{ ...styles.navButton, backgroundColor: '#ff5e57', color: '#fff' }}
                onClick={onLogout}
            >
                Logout
            </button>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '20px' }}>
            {renderScreen()}
        </div>
    </div>
);
};

// Simple styles for the buttons
const styles = {
  navButton: {
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    backgroundColor: '#e9e9e9',
    border: 'none',
    borderRadius: '5px',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default AdminHome;
