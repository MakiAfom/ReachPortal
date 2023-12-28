import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0070f4",
    },
    secondary: {
      main: "#000",
    },
  },
  components: {
    MuiIconButton: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          stroke: "#fff",
          strokeWidth: 0.7,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          fontSize: "1.05rem",
        },
      },
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
    allVariants: {
      textTransform: "none",
    },
  },
});

export default theme;
