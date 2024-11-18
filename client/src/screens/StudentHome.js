import React, { useState } from 'react';
import ViewModules from './ViewModules';
import ViewResults from './ViewResults';
import ViewStudentInfo from './ViewStudentInfo';

const StudentHome = ({ onLogout }) => {
  const [activeScreen, setActiveScreen] = useState('Home'); // Tracks the current screen

  // Components for each screen
  const HomeScreen = () => <h1>Welcome to Student Management System</h1>;

  // Function to render the active screen
  const renderScreen = () => {
      switch (activeScreen) {
          case 'Home':
              return <HomeScreen />;
          case 'View Modules':
              return <ViewModules />;
          case 'View Results':
              return <ViewResults />;
          case 'Personal Info':
              return <ViewStudentInfo />;
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
                onClick={() => setActiveScreen('View Modules')}
            >
                View Modules
            </button>
            <button
                style={styles.navButton}
                onClick={() => setActiveScreen('View Results')}
            >
                View Results
            </button>
            <button
                style={styles.navButton}
                onClick={() => setActiveScreen('Personal Info')}
            >
                Personal Info
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

export default StudentHome;