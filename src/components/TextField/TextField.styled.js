import { Box, TextField } from "@mui/material";
import styled from "styled-components";
import selectedTheme from "../../themes";

export const TextFieldContainer = styled(Box)`
  flex: 1;
  position: relative;
  border: 2px solid white;
  border-radius: 10px;
  height: 48px;
  background-color: ${(props) => props?.backgroundColor || "black"};
  width: 100%;
  /* overflow-x: scroll; */
  /* overflow-y: hidden; */
  /* padding: 13px 14px; */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;

export const TextFieldInput = styled(TextField)`
  width: 100%;
  max-width: calc(400px - 140px);
  font-family: Calibri, sans-serif;
  outline: 0;
  font-size: 16px;
  /* padding-top: 0; */
  padding-top: 13px 14px;
  & * {
    outline: 0;
    padding: 0;
    font-size: 16px;
    border: 0;
    max-height: 48px;
  }
  & legend {
    display: none;
  }
  & fieldset {
    border-width: 0;
    outline: 0;
  }
  & input {
    color: white;
    padding: 11px 14px;
    border: 0 !important;
  }
  & input::placeholder {
    color: white !important;
    padding: 11px 0;
    opacity: 1;
  }
  @media (max-width: 600px) {
    max-width: calc(100vw - 160px);
  }
`;
export const TextFieldCluedContainer = styled(Box)`
  font-family: "Avenir Next", sans-serif;
  font-size: 16px;
  padding: 13px 14px;
  width: 100%;
  /* padding-top: 3px; */
  /* padding: 13px 14px; */
  display: inline-block;
  color: white;
  height: 48px;
  max-width: calc(400px - 160px);

  white-space: pre;
  border: 0;
  outline: 0px solid transparent;
  overflow-x: scroll;
  overflow-y: hidden;
  &:focus-visible {
    border: 0;
  }
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
  @media (max-width: 600px) {
    max-width: calc(100vw - 170px);
  }
`;

export const TextFieldCluedHighlighted = styled(Box)`
  white-space: pre;
  font-family: "Avenir Next", sans-serif;
  height: 48px;
  color: white;
  /* width: 100%; */
  display: inline-block;
  font-weight: 700;
`;

export const TextFieldSuggestionsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 150;
  width: 100%;
  height: fit-content;
  max-height: 300px;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: black;
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
