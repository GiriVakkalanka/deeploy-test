// src/contexts/UserContext.js
import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [email, setEmail] = useState(null);

    const saveEmail = (newEmail) => {
        setEmail(newEmail);
    };

    return (
        <UserContext.Provider value={{ email, saveEmail }}>
            {children}
        </UserContext.Provider>
    );
};
