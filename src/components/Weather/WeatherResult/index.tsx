import { Alert, Box, Stack, styled } from "@mui/material";
import { useAtomValue } from "jotai";
import moment from "moment";

import { SELECTED_WEATHER_STATUS, selectedWeatherAtom } from "..";
import commonConstants from "../../../constants/common.constant";
import {
  Heading32,
  Text16GrayWeight400,
  Text16Weight400,
} from "../../Common/Styled/TypographyStyled";

type DetailLineWeatherProps = {
  label: string;
  value: string;
};

const DetailLineWeather = ({ label, value }: DetailLineWeatherProps) => {
  return (
    <>
      <Text16GrayWeight400>{label}</Text16GrayWeight400>
      <Text16Weight400>{value}</Text16Weight400>
    </>
  );
};

// const StyledContainer = styled(Stack)((theme: any) => ({
//   margin: "10px 0 10px 20px",
//   [theme.breakpoint.down("md")]: {
//     margin: 0,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   },
// }));
const StyledContainer = styled(Stack)`
  margin: 10px 0 10px 20px;
  ${(props) => props.theme.breakpoints.down("md")} {
    margin: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const WeatherResult = () => {
  const selectedWeather = useAtomValue(selectedWeatherAtom);
  if (selectedWeather.status === SELECTED_WEATHER_STATUS.PENDING) {
    return null;
  } else if (selectedWeather.status === SELECTED_WEATHER_STATUS.RESULT) {
    return (
      <StyledContainer>
        <Text16GrayWeight400>
          {`${selectedWeather.weather?.city}, ${selectedWeather.weather?.country}`}
        </Text16GrayWeight400>
        <Heading32>{selectedWeather.weather?.weather}</Heading32>
        <GridContainer>
          <DetailLineWeather
            label="Description:"
            value={selectedWeather.weather?.description!}
          />
          <DetailLineWeather
            label="Temperature:"
            value={`${selectedWeather.weather?.temp_min!}°C ~ ${selectedWeather
              .weather?.temp_max!}°C`}
          />
          <DetailLineWeather
            label="Humidity:"
            value={`${selectedWeather.weather?.humidity!}%`}
          />
          <DetailLineWeather
            label="Time:"
            value={`${moment(selectedWeather.weather?.time).format(
              commonConstants.TIME_FORMAT.DATE_TIME,
            )}`}
          />
        </GridContainer>
      </StyledContainer>
    );
  } else {
    return <Alert severity="error">Not Found</Alert>;
  }
};

const GridContainer = styled(Box)({
  display: "grid",
  gridTemplateColumns: "max-content max-content",
  gap: "5px 20px",
});

export default WeatherResult;
