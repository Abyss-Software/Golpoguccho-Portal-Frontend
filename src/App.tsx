import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import './App.css';
import Router from './Routes';
import { BrowserRouter } from 'react-router-dom';
import { ThemeContext } from './contexts/ThemeContext';
import { useContext } from 'react';

function App() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  return (
    <BrowserRouter>
      <MantineProvider
        theme={{
          colorScheme: darkMode ? 'dark' : 'light',
          colors: {
            brand: [
              '#EBFBEE',
              '#D3F9D8',
              '#B2F2BB',
              '#8CE99A',
              '#69DB7C',
              '#51CF66',
              '#40C057',
              '#37B24D',
              '#2F9E44',
              '#2B8A3E',
            ],
          },
          primaryColor: 'brand',
        }}
      >
        <Router />
      </MantineProvider>
    </BrowserRouter>
  );
}

export default App;
