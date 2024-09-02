"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    id: string;
    email: string;
    userType: string;
    avatar: string | null;
    number: string | null;
    firstName: string;
    lastName: string;
    state: string | null;
    town: string | null;
    address: string | null;
    position: string | null;
    company: string | null;
    isVerified: boolean;
    passwordResetToken: string | null;
    passwordResetExpiry: string | null;
    createdAt: string;
    chatIDs: string[];
    token: string;
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Retrieve user data from localStorage on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);


  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
