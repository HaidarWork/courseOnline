import { extendTheme } from "@chakra-ui/react";
import Button from "./components/button";
import styles from "./styles";
import fonts from "./foundations/fonts";
import breakPoints from "./breakpoints/breakPoints";
import colors from "./foundations/color";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const overrides = {
  colors,
  components: {
    Button,
  },
  styles,
  fonts,
  breakPoints,
};

const theme = extendTheme({ config }, overrides);

export default theme;
