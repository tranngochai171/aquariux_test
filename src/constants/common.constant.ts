const commonConstants = {
  TIME_FORMAT: {
    DATE_TIME: "YYYY-MM-DD hh:mm A",
    TIME: "hh:mm:ss A",
  },
  LOCAL_STORAGE_KEY: {
    HISTORY_WEATHER: "HISTORY_WEATHER",
    MODE_THEME: "MODE_THEME",
    PRIMARY_COLOR_THEME: "PRIMARY_COLOR_THEME",
    LANGUAGE_KEY: "LANGUAGE_KEY",
  } as const,
  MODE_THEME: {
    LIGHT: "light",
    DARK: "dark",
  } as const,
};

export default commonConstants;
