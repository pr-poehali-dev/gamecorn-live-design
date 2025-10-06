import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type UserRole = 'owner' | 'moderator' | 'vip' | 'subscriber' | 'viewer';

interface AuthContextType {
  isLoggedIn: boolean;
  username: string;
  userRole: UserRole;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => void;
  setUserRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState<UserRole>('viewer');

  useEffect(() => {
    const savedAuth = localStorage.getItem('auth');
    if (savedAuth) {
      const { username, userRole } = JSON.parse(savedAuth);
      setIsLoggedIn(true);
      setUsername(username);
      setUserRole(userRole);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const adminEmail = 'hawks_tv@outlook.com';
    const adminPassword = '1l1e1x1a11A';

    let role: UserRole = 'viewer';
    let name = email.split('@')[0];

    if (email.toLowerCase() === adminEmail && password === adminPassword) {
      role = 'owner';
      name = 'Hawks_TV';
    } else if (email.includes('owner') || email.includes('admin')) {
      role = 'owner';
    } else if (email.includes('mod')) {
      role = 'moderator';
    } else if (email.includes('vip')) {
      role = 'vip';
    } else if (email.includes('sub')) {
      role = 'subscriber';
    }
    
    setIsLoggedIn(true);
    setUsername(name);
    setUserRole(role);
    
    localStorage.setItem('auth', JSON.stringify({ username: name, userRole: role }));
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoggedIn(true);
    setUsername(name);
    setUserRole('viewer');
    
    localStorage.setItem('auth', JSON.stringify({ username: name, userRole: 'viewer' }));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setUserRole('viewer');
    localStorage.removeItem('auth');
  };

  const updateUserRole = (role: UserRole) => {
    setUserRole(role);
    const savedAuth = localStorage.getItem('auth');
    if (savedAuth) {
      const auth = JSON.parse(savedAuth);
      auth.userRole = role;
      localStorage.setItem('auth', JSON.stringify(auth));
    }
  };

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      username,
      userRole,
      login,
      register,
      logout,
      setUserRole: updateUserRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};