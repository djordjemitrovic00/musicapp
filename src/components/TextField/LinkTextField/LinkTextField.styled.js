import { Box, TextField } from "@mui/material";
import styled from "styled-components";
import selectedTheme from "../../../themes";
import { ReactComponent as GameOver } from "../../../assets/images/svg/game-over.svg";

export const LinkTextFieldContainer = styled(Box)`
  position: relative;
  /* width: 100vw; */
  display: flex;
  gap: 8px;
  justify-content: center;
  /* background-color: white; */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;
export const LinkTextInputField = styled(TextField)`
  width: 200px;
  background-color: white;
  border-radius: 6px;
  font-family: Calibri, sans-serif;
  outline: 0;
  font-size: 16px;
  position: relative;
  font-size: 18px;
  /* padding: 13px 14px; */
  /* &:empty {
    text-align: center;
  }
  &:focus {
    text-align: left;
  }
  &:empty:not(:focus):before {
    font-family: Calibri, sans-serif;
    content: attr(placeholder);
    text-align: center;
    font-size: 18px;
    padding: 11px 0;
    opacity: 1;
    color: black;
  } */
  & * {
    outline: 0;
    /* padding: 0; */
    font-size: 16px;
    border: 0;
    max-height: 48px;
    color: black;
  }
  & legend {
    display: none;
  }
  & fieldset {
    border-width: 0;
    outline: 0;
  }
  & input {
    color: black;
    /* padding: 11px 14px; */
    border: 0 !important;
  }
  &::placeholder {
    padding: 11px 0;
    opacity: 1;
    color: black;
    text-align: center;
  }
`;
export const GoButton = styled(Box)`
  padding: 4px 6px;
  border-radius: 44%;
  background-color: #05bc5a;
  font-size: 18px;
  position: absolute;
  top: 10px;
  right: 32px;
  cursor: pointer;
`;

export const TextFieldSuggestionsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100%;
  z-index: 150;
  width: 100%;
  height: fit-content;
  max-height: 300px;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: black;
  @media (max-height: 910px) {
    top: initial;
    bottom: 100%;
  }
`;
export const TextFieldSingleSuggestion = styled(Box)`
  width: 100%;
  min-height: 48px;
  height: 48px;
  border: 1px solid ${selectedTheme.colors.suggestionsBorder};
  font-family: Calibri, sans-serif;
  display: flex;
  align-items: center;
  padding-left: 8px;
  &:hover {
    background-color: ${selectedTheme.colors.suggestionsBorder};
    cursor: pointer;
  }
`;
export const TextFieldSingleSuggestionText = styled.pre`
  font-family: Calibri, sans-serif;
  color: white;
  display: inline-block;
`;
export const TextFieldSingleSuggestionTextHighlighted = styled.pre`
  font-family: Calibri, sans-serif;
  display: inline-block;
  color: white;
  background-color: ${selectedTheme.colors.suggestionsHighlight};
`;

export const LinkContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  margin-top: 24px;
`;
export const FinishingText = styled(Box)`
  font-family: Calibri, sans-serif;
  color: white !important;
  font-size: 20px;
  text-align: center;
  max-width: 300px;
`;
export const GameOverIcon = styled(GameOver)`
  width: 50px;
  height: 50px;
  & path {
    fill: red;
  }
`;
