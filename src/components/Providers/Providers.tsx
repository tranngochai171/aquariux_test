import { ThemeProvider } from "@mui/material/styles";
import { Toaster, toast } from "sonner";
import { CssBaseline } from "@mui/material";
import { atom, useAtomValue } from "jotai";
import commonConstants from "../../constants/common.constant";
import { THEME_COLOR_CONSTANT, createTheme } from "../../theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import i18next from "i18next";

type Props = {
  children: React.ReactNode;
};

const onError = (error: any) => {
  let message =
    error?.response?.data?.message ??
    error?.message ??
    i18next.t("common:something_went_wrong");
  if (error?.meta?.errorMessage) {
    message = error?.meta?.errorMessage;
  }
  // Fallback Error Catch If we don't define onError when using useQuery
  toast.error(message);
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      onError,
    },
    mutations: {
      retry: false,
      onError,
    },
  },
});

export type LocalHostThemeType = ValueOf<
  typeof commonConstants.LOCAL_STORAGE_KEY
>;
export type ModeThemeType = ValueOf<typeof commonConstants.MODE_THEME>;
export type PrimaryColorThemeType = ValueOf<typeof THEME_COLOR_CONSTANT>;

const getDefaultThemeValue = <T,>(list: T[], value: T, defaultValue: T) => {
  if (!Object.values(list).includes(value as T)) {
    return defaultValue;
  }
  return value;
};

// Define an atom to read and write the theme
const themeAtom = atom({
  mode:
    localStorage.getItem(commonConstants.LOCAL_STORAGE_KEY.MODE_THEME) ??
    commonConstants.MODE_THEME.LIGHT,
  primaryColor:
    localStorage.getItem(
      commonConstants.LOCAL_STORAGE_KEY.PRIMARY_COLOR_THEME,
    ) ?? THEME_COLOR_CONSTANT.primaryColor,
});

// Define an atom to handle theme persistence
export const themeAtomWithPersistence = atom(
  (get): { mode: ModeThemeType; primaryColor: PrimaryColorThemeType } => {
    let { mode, primaryColor } = get(themeAtom);

    [mode, primaryColor] = [
      {
        list: Object.values(commonConstants.MODE_THEME),
        value: mode,
        defaultValue: commonConstants.MODE_THEME.LIGHT,
      },
      {
        list: Object.values(THEME_COLOR_CONSTANT),
        value: primaryColor,
        defaultValue: THEME_COLOR_CONSTANT.primaryColor,
      },
    ].map(({ list, value, defaultValue }) =>
      getDefaultThemeValue(list, value, defaultValue),
    );

    return { mode, primaryColor } as {
      mode: ModeThemeType;
      primaryColor: PrimaryColorThemeType;
    };
  },
  (
    get,
    set,
    {
      type,
      selectedThemeValue,
    }: { type: LocalHostThemeType; selectedThemeValue: string },
  ) => {
    switch (type) {
      case commonConstants.LOCAL_STORAGE_KEY.MODE_THEME:
        set(themeAtom, { ...get(themeAtom), mode: selectedThemeValue });
        break;
      case commonConstants.LOCAL_STORAGE_KEY.PRIMARY_COLOR_THEME:
        set(themeAtom, { ...get(themeAtom), primaryColor: selectedThemeValue });
        break;
      default:
    }
    localStorage.setItem(type, selectedThemeValue);
  },
);

const Providers = ({ children }: Props) => {
  const { mode, primaryColor } = useAtomValue(themeAtomWithPersistence);
  return (
    <ThemeProvider theme={createTheme(mode, primaryColor)}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster richColors />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default Providers;
