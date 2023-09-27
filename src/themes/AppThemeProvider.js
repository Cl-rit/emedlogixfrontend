import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Verdana",
      textTransform: "none",
      fontSize: 15,
    },
  },

  components: {
    MuiButton: {
      defaultProps: {
        size: "large",
        p: 0,
        disableRipple: true,
      },
      variant: "text",
    },

    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          height: "30px",
        },
      },
    },
  },
});

const AppThemeProvider = (prop) => {
  return <ThemeProvider theme={theme}> {prop.children} </ThemeProvider>;
};

export default AppThemeProvider;
