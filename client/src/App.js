import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import AdminHome from './screens/AdminHome';
import StudentHome from './screens/StudentHome';
import LecturerHome from './screens/LecturerHome';
import { useAuth } from './contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRole }) => {
    const { userRole, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>; // Add a loading spinner here
    }

    if (!userRole) {
        return <Navigate to="/" replace />;
    }

    if (userRole !== allowedRole) {
        return <Navigate to="/" replace />;
    }

    return children;
};

const App = () => {

    const { userRole, userID, login, logout, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

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
                            <LoginScreen />
                        )
                    }
                />
                {/* Admin Home Route */}
                <Route
                    path="/AdminHome"
                    element={
                        <ProtectedRoute allowedRole="admin">
                            <AdminHome onLogout={logout} userID={userID} />
                        </ProtectedRoute>
                    }
                />
                {/* Student Home Route */}
                <Route
                    path="/StudentHome"
                    element={
                        <ProtectedRoute allowedRole="student">
                            <StudentHome onLogout={logout} userID={userID} />
                        </ProtectedRoute>
                    }
                />
                {/* Lecturer Home Route */}
                <Route
                    path="/LecturerHome"
                    element={
                        <ProtectedRoute allowedRole="lecturer">
                            <LecturerHome onLogout={logout} userID={userID} />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );

};

export default App;
