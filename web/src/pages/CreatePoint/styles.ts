import styled from 'styled-components';
import { colors } from '../../styles/colors';

export const Container = styled.div`
  width: 100%;
  max-width: 1100px;

  margin: 0 auto;

  @media (max-width: 900px) {
    width: 90%;
  }

  header {
    margin-top: 48px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      color: var(--title-color);
      font-weight: bold;
      text-decoration: none;

      display: flex;
      align-items: center;

      svg {
        margin-right: 16px;
        color: ${colors.primary};
      }
    }
  }
`;

export const Form = styled.form`
  margin: 80px auto;
  padding: 64px;
  max-width: 730px;
  width: 100%;
  background: #fff;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 36px;
    text-align: center;
  }

  fieldset {
    margin-top: 64px;
    min-inline-size: auto;
    border: 0;
    width: 100%;

    @media (max-width: 900px) {
      width: 300px;
    }

    legend {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;

      h2 {
        font-size: 24px;
      }

      span {
        font-size: 14px;
        font-weight: normal;
        color: ${colors.text};
      }
    }

    ul {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      list-style: none;
      align-items: center;
      justify-content: center;

      @media (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
      }

      li {
        background: #f5f5f5;
        border: 2px solid #f5f5f5;
        height: 180px;
        border-radius: 8px;
        padding: 32px 24px 16px;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        text-align: center;

        cursor: pointer;

        span {
          flex: 1;
          margin-top: 12px;

          display: flex;
          align-items: center;
          color: ${colors.title};
        }
      }

      .selected {
        background: #e1faec;
        border: 2px solid #34cb79;
      }
    }
  }

  .field {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;

    &::placeholder {
      color: #a0a0b2;
    }

    &:disabled {
      cursor: not-allowed;
    }

    input[type='text'],
    input[type='email'],
    input[type='number'] {
      flex: 1;
      background: #f0f0f5;
      border-radius: 8px;
      border: 0;
      padding: 16px 24px;
      font-size: 16px;
      color: #6c6c80;
    }

    select {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      flex: 1;
      background: #f0f0f5;
      border-radius: 8px;
      border: 0;
      padding: 16px 24px;
      font-size: 16px;
      color: #6c6c80;
    }

    label {
      font-size: 14px;
      margin-bottom: 8px;
    }
  }

  .field-group {
    flex: 1;
    display: flex;

    @media (max-width: 900px) {
      flex-direction: column;

      .field + .field {
        margin-left: 0px;
      }
    }

    .field + .field {
      margin-left: 24px;
    }

    input + input {
      margin-left: 24px;
    }
  }

  button {
    @media (max-width: 900px) {
      width: 100%;
    }
    width: 260px;
    height: 56px;
    background: ${colors.primary};
    border-radius: 8px;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    border: 0;
    align-self: flex-end;
    margin-top: 40px;
    transition: background-color 0.2s;
    cursor: pointer;

    &:hover {
      background: #2fb86e;
    }
  }

  .leaflet-container {
    width: 100%;
    height: 350px;
    border-radius: 8px;
    margin-bottom: 24px;
  }
`;
