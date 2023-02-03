import { useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import {
  authScopeSetHelper,
  authScopeStringGetHelper,
} from "../util/helpers/authScopeHelpers";
import selectedTheme from "../themes";

const useToggleColorMode = () => {
  const currentColorMode = authScopeStringGetHelper("colorMode") || "light";
  const [mode, setMode] = useState(currentColorMode);

  const toggleColorMode = () => {
    const nextMode = mode === "light" ? "dark" : "light";
    setMode(nextMode);
    authScopeSetHelper("colorMode", nextMode);
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main:
              mode === "light"
                ? selectedTheme.colors.primaryLight
                : selectedTheme.colors.primaryDark,
          },
          secondary: {
            main:
              mode === "light"
                ? selectedTheme.colors.secondaryLight
                : selectedTheme.colors.secondaryDark,
          },
        },
      }),
    [mode]
  );

  return [toggleColorMode, theme];
};

export default useToggleColorMode;
