import { createTheme } from '@mui/material/styles';

import '@fontsource/roboto'
import '@fontsource/teko'

const colorTheme = createTheme({
  palette: {
    //background: "#E8E8E8",
    primary: {
      main: '#bf360c'
      },
    secondary: {
      main: '#ffc107',
    },
  }
});

const theme = createTheme(colorTheme, {
  typography: {
    fontFamily: 'Teko',
    body1: {
      fontFamily: 'roboto'
    }
  },
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: 'h1' },
          style: {
            color: colorTheme.palette.primary.dark,
            textDecoration: "underline 0.1em",
            fontFamily: 'Teko'
          }
        },
        {
          props: { variant: 'h2' },
          style: {
            color: colorTheme.palette.primary.dark,
            textDecoration: "underline 0.1em",
            fontFamily: 'Teko'
          }
        },
        {
          props: { variant: 'h3' },
          style: {
            color: colorTheme.palette.primary.dark,
            textDecoration: "underline 0.1em",
            fontFamily: 'Teko'
          }
        },
        {
          props: { variant: 'h4' },
          style: {
            color: colorTheme.palette.primary.dark,
            fontFamily: 'Teko'
          }
        },
        {
          props: { variant: 'h5' },
          style: {
            color: colorTheme.palette.primary.dark,
            fontFamily: 'Teko'
          }
        },
        {
          props: { variant: 'h6' },
          style: {
            color: colorTheme.palette.primary.dark,
            fontFamily: 'Teko'
          }
        },
        {
          props: { variant: 'h4' },
          style: {
            color: colorTheme.palette.primary.dark,
            fontFamily: 'Teko'
          }
        }
      ]
    }
  }
})

export default theme  