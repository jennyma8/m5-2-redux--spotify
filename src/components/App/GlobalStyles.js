import { createGlobalStyle } from "styled-components";
import { COLORS } from "../COLORS";

const GlobalStyles = createGlobalStyle`

html,
body,
div,
span {
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
  background: ${COLORS.background};
  color: ${COLORS.letters};
}

/* GLOBAL STYLES */
*,
*:before,
*:after {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  font-family: Montserrat, sans-serif;
}`;

export default GlobalStyles;
