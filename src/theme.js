import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#10AC84",
    },
    secondary: {
      main: "#EE4266",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#222F3E",
      paper: "#fff"
    },
  },
});

export default theme;
