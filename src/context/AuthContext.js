// src/context/AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData)); // Persist user data
    };
        const logout = () => setUser(null);

    // useEffect(() => {
    //     const savedUser = JSON.parse(localStorage.getItem('user'));
    //     if (savedUser) setUser(savedUser);
    // }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
