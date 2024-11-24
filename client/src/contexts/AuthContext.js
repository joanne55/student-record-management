import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [userRole, setUserRole] = useState(() => {
        // Initialize from sessionStorage if available
        const savedRole = sessionStorage.getItem('userRole');
        return savedRole || null;
    });
    const [userID, setUserID] = useState(() => {
        // Initialize from sessionStorage if available
        const savedID = sessionStorage.getItem('userID');
        return savedID || null;
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            console.log('Checking authentication...');
            const token = sessionStorage.getItem('authToken');
            const savedRole = sessionStorage.getItem('userRole');
            const savedID = sessionStorage.getItem('userID');

            console.log('Stored token:', token);
            console.log('Stored role:', savedRole);
            console.log('Stored ID:', savedID);

            if (token && savedRole && savedID) {
                // Don't verify token here, during api calls, backend will verfiy too
                setUserRole(savedRole);
                setUserID(savedID);
            } else if (savedRole && savedID) {
                // If we have saved role and ID but no token, restore the session
                console.log('Restoring session from stored role and ID');
                setUserRole(savedRole);
                setUserID(savedID);
            } else {
                console.log('No stored authentication data found');
                clearAuthData();
            }
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    const clearAuthData = () => {
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('userRole');
        sessionStorage.removeItem('userID');
        setUserRole(null);
        setUserID(null);
    };

    const login = (role, id, token) => {
        console.log('Logging in:', { role, id, token });
        sessionStorage.setItem('authToken', token);
        sessionStorage.setItem('userRole', role);
        sessionStorage.setItem('userID', id);
        setUserRole(role);
        setUserID(id);
    };

    const logout = () => {
        console.log('Logging out');
        clearAuthData();
    };

    console.log('Current auth state:', { userRole, userID, isLoading });

    return (
        <AuthContext.Provider value={{
            userRole,
            userID,
            login,
            logout,
            isLoading
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};