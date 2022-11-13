import { createTheme, ThemeProvider } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useReducer } from 'react';
import { reducer } from '../../reducers/theme.reducer';
import { ThemeContextProps } from '../../types/context.types';
import { ColorScheme } from '../../types/theme.types';
import { ThemeContext } from './context';

function ThemeContextProvider({ children }: ThemeContextProps) {
  const [theme, dispatch] = useReducer(reducer, {
    mode: 'dark',
  });

  const muiTheme = createTheme({
    palette: {
      mode: theme.mode,
    },
  });

  function setMode(mode: ColorScheme) {
    const opposite = mode === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.add(`theme-mode-${mode}`);
    document.documentElement.classList.remove(`theme-mode-${opposite}`);
  }

  useEffect(() => {
    setMode(theme.mode);
  }, [theme]);

  return (
    <ThemeContext.Provider value={[theme, dispatch]}>
      <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}

ThemeContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default ThemeContextProvider;
