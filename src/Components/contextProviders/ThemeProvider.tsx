import { createTheme, ThemeProvider } from '@mui/material';
import { useEffect } from 'react';
import { ThemeContextProps } from '../../types/context.types';
import { ColorScheme } from '../../types/theme.types';
import { useStateContext } from './context';

export default function ThemeContextProvider({ children }: ThemeContextProps) {
  const [state] = useStateContext();

  const muiTheme = createTheme({
    palette: {
      mode: state.theme,
    },
  });

  function setTheme(colorScheme: ColorScheme) {
    const opposite = colorScheme === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.add(`${colorScheme}-theme`);
    document.documentElement.classList.remove(`${opposite}-theme`);
  }

  useEffect(() => {
    setTheme(state.theme);
  }, [state.theme]);

  return <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>;
}
