'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'recruiter' | 'client' | 'vendor' | 'candidate';
  permissions: string[];
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  verifyTwoFactor: (code: string) => Promise<boolean>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    checkExistingSession();
  }, []);

  const checkExistingSession = async () => {
    try {
      // Check localStorage for existing session
      const sessionData = localStorage.getItem('prorecruit_session');
      if (sessionData) {
        const session = JSON.parse(sessionData);
        // In real app, validate session with backend
        setUser(session.user);
      }
    } catch (error) {
      console.error('Session check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Mock API call - replace with real authentication
      const response = await mockLoginAPI(email, password);
      
      if (response.success && response.user) {
        const userData: User = {
          id: response.user.id,
          email: response.user.email,
          name: response.user.name,
          role: response.user.role as 'admin' | 'recruiter' | 'client' | 'vendor' | 'candidate',
          permissions: getUserPermissions(response.user.role)
        };
        
        setUser(userData);
        
        // Store session in localStorage
        localStorage.setItem('prorecruit_session', JSON.stringify({
          user: userData,
          token: response.token,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
        }));
        
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyTwoFactor = async (code: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Mock 2FA verification - replace with real verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any 6-digit code
      if (code.length === 6) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('2FA verification failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('prorecruit_session');
    // In real app, call logout API endpoint
  };

  const getUserPermissions = (role: string): string[] => {
    const permissions: { [key: string]: string[] } = {
      admin: ['*'], // All permissions
      recruiter: ['candidates.read', 'candidates.write', 'jobs.read', 'jobs.write'],
      client: ['candidates.read', 'jobs.read', 'reports.read'],
      vendor: ['jobs.read', 'candidates.read'],
      candidate: ['profile.read', 'profile.write', 'applications.read']
    };
    
    return permissions[role] || [];
  };

  // Mock API function - replace with real API call
  const mockLoginAPI = async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUsers = {
      'admin@prorecruit.co.il': { 
        id: '1', 
        role: 'admin', 
        name: 'מנהל מערכת' 
      },
      'recruiter@prorecruit.co.il': { 
        id: '2', 
        role: 'recruiter', 
        name: 'מגייס' 
      },
      'client@company.com': { 
        id: '3', 
        role: 'client', 
        name: 'לקוח' 
      },
      'vendor@vendor.com': { 
        id: '4', 
        role: 'vendor', 
        name: 'ספק' 
      },
      'candidate@email.com': { 
        id: '5', 
        role: 'candidate', 
        name: 'מועמד' 
      }
    };

    const user = mockUsers[email as keyof typeof mockUsers];
    
    if (user && password === 'password123') {
      return {
        success: true,
        user: {
          ...user,
          email
        },
        token: 'mock-jwt-token-' + Date.now()
      };
    } else {
      return {
        success: false,
        message: 'פרטי התחברות שגויים'
      };
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    verifyTwoFactor,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
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