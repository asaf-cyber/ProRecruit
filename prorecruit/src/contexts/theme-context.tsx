'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>('light');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme') as Theme;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    
    const initialTheme = savedTheme || systemTheme;
    setTheme(initialTheme);
    
    // Apply theme to document
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
    setIsLoading(false);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Apply theme with smooth transition
    document.documentElement.style.transition = 'background-color 300ms ease, color 300ms ease';
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    
    // Remove transition after animation
    setTimeout(() => {
      document.documentElement.style.transition = '';
    }, 300);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isLoading }}>
      {children}
    </ThemeContext.Provider>
  );
}