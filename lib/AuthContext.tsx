"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRole, Role } from './RoleContext';

export interface User {
  email: string;
  name: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string, role: Role) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SEED_USERS = [
  {
    email: 'goalsync26@gmail.com',
    password: '1230',
    name: 'Dr. Aris Thorne',
    role: 'ADMIN' as Role
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const { setRole } = useRole();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize registered users and active session from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 1. Seed users if not already present in localStorage
      const existingUsers = localStorage.getItem('goalsync_users');
      if (!existingUsers) {
        localStorage.setItem('goalsync_users', JSON.stringify(SEED_USERS));
      } else {
        // Double check that goalsync26@gmail.com is in there (just in case they already have some list)
        try {
          const users = JSON.parse(existingUsers);
          const hasSeed = users.some((u: any) => u.email.toLowerCase() === 'goalsync26@gmail.com');
          if (!hasSeed) {
            users.push(SEED_USERS[0]);
            localStorage.setItem('goalsync_users', JSON.stringify(users));
          }
        } catch (e) {
          localStorage.setItem('goalsync_users', JSON.stringify(SEED_USERS));
        }
      }

      // 2. Check for active session
      const savedUser = localStorage.getItem('goalsync_active_user');
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser) as User;
          setUser(parsedUser);
          setRole(parsedUser.role);
        } catch (e) {
          console.error("Failed to parse active user session", e);
        }
      }
      setIsLoading(false);
    }
  }, [setRole]);

  const login = async (email: string, password: string) => {
    // Artificial small delay for premium tech look & feel
    await new Promise(resolve => setTimeout(resolve, 800));

    if (typeof window === 'undefined') return { success: false, error: 'Environment error' };

    const usersStr = localStorage.getItem('goalsync_users');
    const users = usersStr ? JSON.parse(usersStr) : SEED_USERS;

    const matchedUser = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase() && String(u.password) === String(password));

    if (matchedUser) {
      const activeUser: User = {
        email: matchedUser.email,
        name: matchedUser.name,
        role: matchedUser.role
      };
      localStorage.setItem('goalsync_active_user', JSON.stringify(activeUser));
      setUser(activeUser);
      setRole(activeUser.role);
      return { success: true };
    } else {
      return { success: false, error: 'Invalid email or password' };
    }
  };

  const signup = async (name: string, email: string, password: string, role: Role) => {
    await new Promise(resolve => setTimeout(resolve, 800));

    if (typeof window === 'undefined') return { success: false, error: 'Environment error' };

    const usersStr = localStorage.getItem('goalsync_users') || JSON.stringify(SEED_USERS);
    const users = JSON.parse(usersStr);

    const emailExists = users.some((u: any) => u.email.toLowerCase() === email.toLowerCase());
    if (emailExists) {
      return { success: false, error: 'Account with this email already exists' };
    }

    const newUser = { name, email, password, role };
    users.push(newUser);
    localStorage.setItem('goalsync_users', JSON.stringify(users));

    // Auto-login after sign-up
    const activeUser: User = { name, email, role };
    localStorage.setItem('goalsync_active_user', JSON.stringify(activeUser));
    setUser(activeUser);
    setRole(role);

    return { success: true };
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('goalsync_active_user');
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
