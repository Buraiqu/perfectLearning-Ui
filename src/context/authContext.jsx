import { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
      id: '123',
      email: 'test_user@gmail.com',
      name: 'Test User',
      isVerified: true,
      token: 'sample-token'
    });

    return (
        <AuthContext.Provider value={{ user, setUser}}>
          {children}
        </AuthContext.Provider>
    );

}

export { AuthContext, AuthProvider };