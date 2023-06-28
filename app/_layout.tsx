import { Stack } from "expo-router";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./themes/default";

export default function Layout() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Stack initialRouteName="/login" screenOptions={{}} />
    </ThemeProvider>
  );
}
