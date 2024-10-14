'use client';
import { useState, useEffect } from 'react';

const isDark = (): boolean =>
  (typeof window !== 'undefined' && localStorage.theme === 'dark') ||
  (!('theme' in localStorage) &&
    window.matchMedia('(prefers-color-scheme: dark)').matches);

const getThemeString = (isDark: boolean): string => (isDark ? 'dark' : 'light');

const ModeToggle = (): JSX.Element => {
  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setDarkMode(isDark());
  }, []);

  const toggleMode = (): void => {
    localStorage.theme = getThemeString(!isDarkMode);
    if (localStorage.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setDarkMode(!isDarkMode);
  };

  return (
    <button onClick={toggleMode}>
      <span className='text-2xl focus:outline-none sm:text-3xl'>
        {isDarkMode ? '🌤️' : '🌙'}
      </span>
    </button>
  );
};

export default ModeToggle;
