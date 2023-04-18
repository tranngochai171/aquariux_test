import { Divider, Stack, styled } from "@mui/material";

import { themes } from "../../theme";

export const WeatherBox = styled(Stack)({
  borderRadius: 10,
  border: `2px solid ${themes.light.colorBlack}`,
  padding: 10,
  marginTop: 20,
});

export const StyledDivider = styled(Divider)({
  borderWidth: 1,
  borderColor: themes.light.colorBlack,
  marginBottom: 20,
});
