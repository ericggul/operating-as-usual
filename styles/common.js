import { css, createGlobalStyle } from "styled-components";

export const FlexCenterStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const WholeContainer = css`
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;
`;

export const GlobalStyle = createGlobalStyle`
body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Times New Roman";

    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  h1, h2, h3, h4, h5, h6, p{
    margin: 0;
    padding: 0;
  }

  input {
    border-radius: 0;
    -webkit-appearance: none;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }


  /* fonts */

  /* Roboto */

  @font-face{
    font-family: "Roboto";
    src: url('/assets/fonts/Roboto/Roboto-Regular.ttf');
  }

  @font-face{
    font-family: "Roboto";
    font-weight: 700;
    src: url('/assets/fonts/Roboto/Roboto-Bold.ttf');
  }

  @font-face{
    font-family: "Roboto";
    font-weight: 500;
    src: url('/assets/fonts/Roboto/Roboto-Medium.ttf');
  }

  @font-face{
    font-family: "Roboto";
    font-weight: 300;
    src: url('/assets/fonts/Roboto/Roboto-Light.ttf');
  }

  @font-face{
    font-family: "Roboto";
    font-weight: 100;
    src: url('/assets/fonts/Roboto/Roboto-Thin.ttf');
  }


`;
