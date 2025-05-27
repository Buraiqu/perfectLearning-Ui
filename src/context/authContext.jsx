import { createContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

/**
 * Authentication Provider Component
 * Manages authentication state and provides auth-related functions to the app
 */
const AuthProvider = ({ children }) => {
  // Initialize user state from localStorage if available, otherwise null
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('auth_token');
    // Only set initial user if token exists (for demo purposes)
    // In production, you might want to validate the token first
    if (token) {
      return {
        id: '123',
        email: 'test_user@gmail.com',
        name: 'Test User',
        isVerified: true,
        token: token
      };
    }
    return null;
  });

  // Check if user is authenticated
  const isAuthenticated = useCallback(() => {
    return !!user;
  }, [user]);

  // Function to set user data after fetching user details
  const setUserData = useCallback((userData) => {
    setUser(userData);
  }, []);

  // Provide logout function that will be used with AuthService
  const logout = useCallback(() => {
    setUser(null);
  }, []);

  // Context value with all auth-related state and functions
  const contextValue = {
    user,
    setUser: setUserData,
    isAuthenticated,
    logout
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };