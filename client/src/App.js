import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import AdminHome from './screens/AdminHome';
import StudentHome from './screens/StudentHome';
import LecturerHome from './screens/LecturerHome';

const App = () => {
  const [userRole, setUserRole] = useState(null);
  const [userID, setUserID] = useState(null);

  const handleLogin = (role, id) => {
    setUserRole(role);
    setUserID(id);
  };

  const handleLogout = () => {
      setUserRole(null);
      setUserID(null);
  };

  return (
    <Router>
        <Routes>
            {/* Login Route */}
            <Route
                path="/"
                element={
                    userRole ? (
                        <Navigate replace to={`/${userRole}Home`} />
                    ) : (
                        <LoginScreen onLogin={handleLogin} userID={userID} />
                    )
                }
            />
            {/* Admin Home Route */}
            <Route
                path="/AdminHome"
                element={
                    userRole === 'admin' ? (
                        <AdminHome onLogout={handleLogout}  userID={userID} />
                    ) : (
                        <Navigate replace to="/" />
                    )
                }
            />
            {/* Student Home Route */}
            <Route
                path="/StudentHome"
                element={
                    userRole === 'student' ? (
                        <StudentHome onLogout={handleLogout} userID={userID} />
                    ) : (
                        <Navigate replace to="/" />
                    )
                }
            />
            {/* Lecturer Home Route */}
            <Route
                path="/LecturerHome"
                element={
                    userRole === 'lecturer' ? (
                        <LecturerHome onLogout={handleLogout} userID={userID} />
                    ) : (
                        <Navigate replace to="/" />
                    )
                }
            />
        </Routes>
    </Router>
);

};

export default App;
