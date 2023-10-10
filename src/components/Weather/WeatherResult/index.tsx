import { Alert, Box, Stack, styled } from "@mui/material";
import { useAtomValue } from "jotai";
import moment from "moment";
import { SELECTED_WEATHER_STATUS, selectedWeatherAtom } from "..";
import commonConstants from "../../../constants/common.constant";
import {
  Heading32,
  Text16Weight400,
} from "../../Common/Styled/TypographyStyled";
import { useTranslation } from "react-i18next";
import { NAME_SPACES } from "../../../i18n/i18n";

type DetailLineWeatherProps = {
  label: string;
  value: string;
};

const DetailLineWeather = ({ label, value }: DetailLineWeatherProps) => {
  return (
    <>
      <Text16Weight400 color="gray">{label}</Text16Weight400>
      <Text16Weight400>{value}</Text16Weight400>
    </>
  );
};

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
  const { t } = useTranslation(NAME_SPACES.WEATHER);
  const selectedWeather = useAtomValue(selectedWeatherAtom);
  if (selectedWeather.status === SELECTED_WEATHER_STATUS.PENDING) {
    return null;
  } else if (selectedWeather.status === SELECTED_WEATHER_STATUS.RESULT) {
    return (
      <StyledContainer>
        <Text16Weight400 color="gray">
          {`${selectedWeather.weather?.city}, ${selectedWeather.weather?.country}`}
        </Text16Weight400>
        <Heading32>
          {selectedWeather.weather?.weather}{" "}
          <img src={selectedWeather.weather?.icon} />
        </Heading32>
        <GridContainer>
          <DetailLineWeather
            label={`${t("weather result.description")}:`}
            value={selectedWeather.weather?.description!}
          />
          <DetailLineWeather
            label={`${t("weather result.temperature")}:`}
            value={`${selectedWeather.weather?.temp_min!}°C ~ ${selectedWeather
              .weather?.temp_max!}°C`}
          />
          <DetailLineWeather
            label={`${t("weather result.humidity")}:`}
            value={`${selectedWeather.weather?.humidity!}%`}
          />
          <DetailLineWeather
            label={`${t("weather result.time")}:`}
            value={`${moment(selectedWeather.weather?.time).format(
              commonConstants.TIME_FORMAT.DATE_TIME,
            )}`}
          />
        </GridContainer>
      </StyledContainer>
    );
  } else {
    return (
      <Alert severity="error" variant="filled" sx={{ my: 2 }}>
        Not Found
      </Alert>
    );
  }
};

const GridContainer = styled(Box)({
  display: "grid",
  gridTemplateColumns: "max-content max-content",
  gap: "5px 20px",
});

export default WeatherResult;
