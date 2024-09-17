"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from 'js-cookie'; // Import js-cookie

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
    // Retrieve user data from cookies using js-cookie
    const token = Cookies.get('token'); // Check if token exists

    if (token) {
      // Extract other user-related cookies
      const userData: User = {
        id: Cookies.get('id') || "",
        email: Cookies.get('email') || "",
        userType: Cookies.get('userType') || "",
        avatar: Cookies.get('avatar') || null,
        number: Cookies.get('number') || null,
        firstName: Cookies.get('firstName') || "",
        lastName: Cookies.get('lastName') || "",
        state: Cookies.get('state') || null,
        town: Cookies.get('town') || null,
        address: Cookies.get('address') || null,
        position: Cookies.get('position') || null,
        company: Cookies.get('company') || null,
        isVerified: Cookies.get('isVerified') === "true",
        passwordResetToken: Cookies.get('passwordResetToken') || null,
        passwordResetExpiry: Cookies.get('passwordResetExpiry') || null,
        createdAt: Cookies.get('createdAt') || "",
        chatIDs: Cookies.get('chatIDs') ? Cookies.get('chatIDs')!.split(",") : [],
        token: token,
      };

      setUser(userData);
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
