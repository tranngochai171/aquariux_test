import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  styled,
} from "@mui/material";
import {
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
} from "@mui/icons-material";
import {
  ModeThemeType,
  PrimaryColorThemeType,
  themeAtomWithPersistence,
} from "../Providers/Providers";
import commonConstants from "../../constants/common.constant";
import { useAtom } from "jotai";
import { THEME_COLOR_CONSTANT } from "../../theme";
import { LANGUAGES, MAPPING_FLAG, NAME_SPACES, locales } from "../../i18n/i18n";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const ActionButton = styled(Button)({
  width: "100%",
});

const getThemeModeLang = (mode: ModeThemeType) => {
  const MAPPING_THEME_MODE: Record<
    ModeThemeType,
    { icon: React.ReactNode; text: string }
  > = {
    [commonConstants.MODE_THEME.LIGHT]: {
      icon: <Brightness4Icon />,
      text: i18next.t("common:light_mode"),
    },
    [commonConstants.MODE_THEME.DARK]: {
      icon: <Brightness7Icon />,
      text: i18next.t("common:dark_mode"),
    },
  } as const;
  return MAPPING_THEME_MODE[mode];
};

const Header = () => {
  const { t, i18n } = useTranslation(NAME_SPACES.COMMON);
  const [themeAtom, setThemeAtom] = useAtom(themeAtomWithPersistence);

  const changeLanguage = (lng: (typeof LANGUAGES)[keyof typeof LANGUAGES]) => {
    i18n.changeLanguage(lng);
    localStorage.setItem(commonConstants.LOCAL_STORAGE_KEY.LANGUAGE_KEY, lng);
  };

  const changeThemeMode = () => {
    setThemeAtom({
      type: commonConstants.LOCAL_STORAGE_KEY.MODE_THEME,
      selectedThemeValue:
        themeAtom.mode === commonConstants.MODE_THEME.LIGHT
          ? commonConstants.MODE_THEME.DARK
          : commonConstants.MODE_THEME.LIGHT,
    });
  };

  const changePrimaryColor = (event: SelectChangeEvent) => {
    setThemeAtom({
      type: commonConstants.LOCAL_STORAGE_KEY.PRIMARY_COLOR_THEME,
      selectedThemeValue: event.target.value as PrimaryColorThemeType,
    });
  };

  const currentLng = locales?.[i18n.language as keyof typeof locales];
  const { text: textMode, icon: iconMode } = getThemeModeLang(themeAtom.mode);

  return (
    <Stack direction="row" alignItems="center" justifyContent="flex-end">
      <Stack direction="row" gap={2}>
        <ActionButton
          variant="outlined"
          startIcon={
            <img
              src={MAPPING_FLAG[i18n.language as ValueOf<typeof LANGUAGES>].src}
              alt={MAPPING_FLAG[i18n.language as ValueOf<typeof LANGUAGES>].alt}
              style={{ width: 20 }}
            />
          }
          onClick={() =>
            changeLanguage(
              i18n.language === LANGUAGES.VI ? LANGUAGES.EN : LANGUAGES.VI,
            )
          }
        >
          {currentLng}
        </ActionButton>
        <ActionButton
          variant="outlined"
          onClick={changeThemeMode}
          endIcon={iconMode}
        >
          {textMode}
        </ActionButton>
        <FormControl
          fullWidth
          variant="outlined"
          color="primary"
          sx={{ alignSelf: "center" }}
        >
          <InputLabel id="demo-simple-select-label">{t("color")}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={themeAtom.primaryColor}
            label={t("color")}
            onChange={changePrimaryColor}
          >
            {Object.values(THEME_COLOR_CONSTANT).map((color) => (
              <MenuItem key={color} value={color}>
                <Box
                  sx={{
                    width: 20,
                    aspectRatio: "1 / 1",
                    backgroundColor: color,
                  }}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Stack>
  );
};

export default Header;
