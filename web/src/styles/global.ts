import { createGlobalStyle } from 'styled-components';
import { colors } from './colors';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: ${colors.background};
    -webkit-font-smoothing: antialiased;
    color: ${colors.text}
  }

  body, input, button {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-family: 'Ubuntu', sans-serif;
    color: ${colors.title}
  }

  button {
    cursor: pointer;
  }

  img {
    object-fit: cover;
  }
`;
