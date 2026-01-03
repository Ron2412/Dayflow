import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { MOCK_USER, MOCK_HR } from '../lib/mockData';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('dayflow_user');
        return saved ? JSON.parse(saved) : null;
    });
    const [loading, setLoading] = useState(false);

    const signIn = async ({ email, password }) => {
        setLoading(true);

        // Simulation: accept any password for mock accounts
        let foundUser = null;

        // 1. Check hardcoded defaults
        if (email === 'hr@odooindia.com' || email === 'OISASM2024001') {
            foundUser = { ...MOCK_HR };
        } else if (email === 'employee@odooindia.com' || email === 'OIJODO2024001') {
            foundUser = { ...MOCK_USER };
        } else {
            // 2. Check dynamic users created via "Add Employee" or "Signup"
            const dynamicUsers = JSON.parse(localStorage.getItem('dayflow_dynamic_users') || '[]');
            foundUser = dynamicUsers.find(u => u.email === email || u.employee_id === email);

            // For dynamic users, we should actually check the password
            if (foundUser && foundUser.password !== password) {
                foundUser = null; // Wrong password
            }
        }

        return new Promise((resolve) => {
            setTimeout(() => {
                if (foundUser) {
                    setUser(foundUser);
                    localStorage.setItem('dayflow_user', JSON.stringify(foundUser));
                    resolve({ data: { user: foundUser }, error: null });
                } else {
                    resolve({ data: null, error: { message: 'Invalid credentials. Hint: use hr@odooindia.com or a generated ID.' } });
                }
                setLoading(false);
            }, 800);
        });
    };

    const signOut = async () => {
        setUser(null);
        localStorage.removeItem('dayflow_user');
    };

    const value = {
        user,
        profile: user, // Simplified for mock: profile is the user object
        loading,
        signIn,
        signOut,
        signUp: () => { console.error('Sign up disabled in prototype'); }
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
