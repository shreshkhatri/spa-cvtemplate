import { createTheme, ThemeProvider} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
          main: '#3f51b5',
        },
        secondary: {
          main: '#f50057',
        }
      },
});

export default function AppTheme({children}) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
  }
