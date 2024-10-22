import React from 'react';
import { Button } from '@rewind-ui/core';
import { useTheme } from '@/utils/useTheme';

const ThemeToggleButton = (): JSX.Element => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      color={theme === 'light' ? 'dark' : 'blue'}
      className="theme-toggle-button"
    >
      {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    </Button>
  );
};

export default ThemeToggleButton;
