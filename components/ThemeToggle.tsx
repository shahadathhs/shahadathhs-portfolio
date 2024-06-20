import React, { useContext } from 'react';
import { GiMoon } from 'react-icons/gi';
import { GoSun } from 'react-icons/go';
import { ThemeContext } from '../providers/ThemeProvider';

const ThemeToggle: React.FC = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    // Handle the case where themeContext is undefined
    return null;
  }

  const { theme, toggleTheme } = themeContext;

  return (
    <div>
      <label className="swap swap-rotate">
        <input onClick={toggleTheme} type="checkbox" className="theme-controller" />
        {
          theme === 'synthwave' 
          ? <GoSun className="text-3xl m-2" />
          : <GiMoon className="text-3xl m-2" />
        }
      </label>
    </div>
  );
};

export default ThemeToggle;