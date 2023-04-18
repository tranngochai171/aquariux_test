import { createTheme } from "@mui/material";

interface IObjectKeys {
  [key: string]: string;
}

const lightTheme: IObjectKeys = {
  colorBlack: "#000000",
  colorWhite: "#FFFFFF",
  colorGray: "#646464",
  colorElectricRed: "#E10600",
  colorDune: "#313131",
  colorDesert: "#D2AB66",
};

export const themes = {
  light: lightTheme,
  //add theme if customer like
};

export const themeMaterial = createTheme({
  palette: {
    primary: {
      main: lightTheme.colorBlack,
      contrastText: lightTheme.colorBlack,
    },
  },
});
