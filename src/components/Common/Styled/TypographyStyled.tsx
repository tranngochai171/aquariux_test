import { styled, Typography } from "@mui/material";

import { themes } from "../../../theme";

export const Heading18 = styled(Typography)({
  fontSize: "18px",
  fontWeight: 600,
});

export const Heading32 = styled(Typography)({
  fontSize: "32px",
  fontWeight: 600,
});

// Font Size 16
export const Text16GrayWeight400 = styled(Typography)({
  fontWeight: 400,
  fontSize: "16px",
  color: themes.light.colorGray,
});
export const Text16Weight400 = styled(Typography)({
  fontWeight: 400,
  fontSize: "16px",
  color: themes.light.colorBlack,
});
