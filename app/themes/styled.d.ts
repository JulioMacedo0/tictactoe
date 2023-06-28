import { defaultTheme } from "./themes/defaultTheme";
import "styled-components";

type ThemeType = typeof defaultTheme;

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}
