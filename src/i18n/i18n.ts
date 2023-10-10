import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import COMMON_EN from "../locales/en/common.json";
import WEATHER_EN from "../locales/en/weather.json";
import COMMON_VI from "../locales/vi/common.json";
import WEATHER_VI from "../locales/vi/weather.json";
import englandFlag from "../assets/images/united-kingdom.png";
import vietnamFlag from "../assets/images/vietnam.png";
import commonConstants from "../constants/common.constant";

export const LANGUAGES = {
  EN: "en",
  VI: "vi",
} as const;

export const MAPPING_FLAG = {
  [LANGUAGES.EN]: {
    src: englandFlag,
    alt: "England flag",
  },
  [LANGUAGES.VI]: {
    src: vietnamFlag,
    alt: "Vietnam flag",
  },
} as const;

export const NAME_SPACES = {
  WEATHER: "weather",
  COMMON: "common",
} as const;

export const locales: Record<
  (typeof LANGUAGES)[keyof typeof LANGUAGES],
  string
> = {
  [LANGUAGES.EN]: "English",
  [LANGUAGES.VI]: "Tiếng Việt",
};

export const resources = {
  [LANGUAGES.EN]: {
    [NAME_SPACES.COMMON]: COMMON_EN,
    [NAME_SPACES.WEATHER]: WEATHER_EN,
  },
  [LANGUAGES.VI]: {
    [NAME_SPACES.COMMON]: COMMON_VI,
    [NAME_SPACES.WEATHER]: WEATHER_VI,
  },
} as const;

export const defaultNS = NAME_SPACES.WEATHER;

i18n.use(initReactI18next).init({
  resources,
  lng:
    localStorage.getItem(commonConstants.LOCAL_STORAGE_KEY.LANGUAGE_KEY) ||
    LANGUAGES.EN,
  fallbackLng: LANGUAGES.EN,
  ns: [NAME_SPACES.COMMON, NAME_SPACES.WEATHER],
  defaultNS,
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});
