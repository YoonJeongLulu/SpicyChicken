import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#392418",
    },
    secondary: {
      main: "#A52F31",
    },
    text: {
      primary: "#392418",
    },
  },
  typography: {
    fontFamily: "Montserrat",
    body1: {
      fontSize: 20,
    },
    body2: {
      fontSize: 16,
    },
    allVariants: {
      color: "#392418",
    },
    h4: {
      fontWeight: 700,
      fontSize: 32,
    },
    h5: {
      fontSize: 24,
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "6px 6px 20px 6px #817665",
          borderRadius: 20,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "12px 24px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          fontSize: "1.2rem",
          padding: "10px",
          minWidth: 138,
        },
        contained: {
          boxShadow: "6px 6px 20px 6px #817665",
          color:"rgb(251 241 225)",
          '&:hover': {
            boxShadow: "6px 6px 20px 6px #817665",
          }
        },
        containedSecondary: {
          color: "#F5E6D1",
        },
      },
    },
  },
});

export default function Theme({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
