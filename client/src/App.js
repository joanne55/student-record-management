import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import AdminHome from './screens/AdminHome';
import StudentHome from './screens/StudentHome';

const App = () => {
  const [userRole, setUserRole] = useState(null);

  const handleLogin = (role) => {
    setUserRole(role);
  };

  const handleLogout = () => {
      setUserRole(null);
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
                        <LoginScreen onLogin={handleLogin} />
                    )
                }
            />
            {/* Admin Home Route */}
            <Route
                path="/AdminHome"
                element={
                    userRole === 'admin' ? (
                        <AdminHome onLogout={handleLogout} />
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
                        <StudentHome onLogout={handleLogout} />
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
