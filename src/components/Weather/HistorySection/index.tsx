import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Divider, IconButton, Stack, styled } from "@mui/material";
import { useAtomValue, useSetAtom } from "jotai";
import moment from "moment";
import React, { useMemo } from "react";
import {
  removeWeatherAtom,
  reselectWeatherAtom,
  sortedHistoryWeatherAtom,
} from "..";
import commonConstants from "../../../constants/common.constant";
import { useSearchWeather } from "../../../hooks/useSearch";
import { Heading18 } from "../../Common/Styled/TypographyStyled";
import { StyledDivider } from "../WeatherStyled";
import { useTranslation } from "react-i18next";
import { NAME_SPACES } from "../../../i18n/i18n";

const NoRecordBox = styled(Box)({
  height: "200px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const HistorySection = () => {
  const { t } = useTranslation(NAME_SPACES.WEATHER);
  const sortedHistoryWeather = useAtomValue(sortedHistoryWeatherAtom);
  const removeHistoryWeather = useSetAtom(removeWeatherAtom);
  const reselectWeather = useSetAtom(reselectWeatherAtom);
  const { mutate: mutateSearch, isLoading } = useSearchWeather();
  const content = useMemo(() => {
    if (sortedHistoryWeather.length) {
      return (
        <Stack mt={2}>
          {sortedHistoryWeather.map((item, index) => (
            <React.Fragment key={item.id}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack>{`${index + 1}. ${item.city}, ${item.country}`}</Stack>
                <Stack direction="row" alignItems="center" gap={1}>
                  {moment(item.time).format(commonConstants.TIME_FORMAT.TIME)}
                  <Stack direction="row">
                    <IconButton
                      disabled={isLoading}
                      onClick={() => {
                        mutateSearch({
                          city: item.city,
                          country: item.country,
                        });
                        reselectWeather(item);
                      }}
                    >
                      <SearchIcon />
                    </IconButton>
                    <IconButton
                      disabled={isLoading}
                      onClick={() => removeHistoryWeather(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </Stack>
              </Stack>
              <Divider />
            </React.Fragment>
          ))}
        </Stack>
      );
    }
    return <NoRecordBox>{t("history section.no record")}</NoRecordBox>;
  }, [sortedHistoryWeather, t]);
  return (
    <Box mt={4}>
      <Heading18>{t("history section.search history")}</Heading18>
      <StyledDivider />
      {content}
    </Box>
  );
};

export default HistorySection;
