import { createTheme as createMuiTheme } from "@mui/material";
import {
  ModeThemeType,
  PrimaryColorThemeType,
} from "./components/Providers/Providers";

export const THEME_COLOR_CONSTANT = {
  primaryColor: "#3b5dd9",
  secondaryColor: "#de4040",
  greenColor: "#19a13f",
  grayColor: "#646464",
} as const;

let themeMaterial = createMuiTheme({});

themeMaterial = createMuiTheme(themeMaterial, {
  palette: {
    gray: themeMaterial.palette.augmentColor({
      color: {
        main: THEME_COLOR_CONSTANT.grayColor,
      },
      name: "gray",
    }),
  },
});

const createTheme = (
  mode: ModeThemeType,
  primaryColor: PrimaryColorThemeType,
) =>
  createMuiTheme({
    typography: {
      fontFamily: "Inclusive Sans, Arial, sans-serif",
    },
    palette: {
      mode,
      primary: {
        main: primaryColor || THEME_COLOR_CONSTANT.primaryColor,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "unset",
          },
        },
      },
    },
  });

declare module "@mui/material/styles" {
  interface Palette {
    gray: Palette["primary"];
  }
  interface PaletteOptions {
    gray?: PaletteOptions["primary"];
  }
}

export { themeMaterial, createTheme };
