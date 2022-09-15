import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import theme from './style/theme'
import ThemeProvider from '@mui/material/styles/ThemeProvider';



ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
,
  document.getElementById('root')
);
