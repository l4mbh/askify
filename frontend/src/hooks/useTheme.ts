import { useState, useEffect } from 'react';

// Custom hook để quản lý theme
export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Kiểm tra theme từ localStorage khi component mount
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    
    // Áp dụng theme class cho html element
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Function để toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // Lưu vào localStorage
    localStorage.setItem('theme', newTheme);
    
    // Áp dụng theme class
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return {
    theme,
    toggleTheme,
    isDark: theme === 'dark'
  };
} 