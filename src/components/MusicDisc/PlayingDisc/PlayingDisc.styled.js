import { Box } from "@mui/material";
import styled, { css, keyframes } from "styled-components";
import { ReactComponent as Play } from "../../../assets/images/svg/play.svg";
import { ReactComponent as Pause } from "../../../assets/images/svg/pause.svg";
import MusicDisc from "../MusicDisc";

export const PlayingDiscContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 50px;
  height: 50px;
  cursor: pointer;
`;
export const PlayingCommands = styled(Box)`
  position: absolute;
  top: 45%;
  left: 40%;
  display: flex;
  width: 20px;
  height: 20px;
  flex-direction: row;
`;
export const PlayIcon = styled(Play)`
  width: 6px;
  height: 6px;
`;
export const PauseIcon = styled(Pause)`
  position: relative;
  left: -4%;
  width: 6px;
  height: 6px;
`;
export const DiscIcon = styled(MusicDisc)`
  width: 50px;
  height: 50px;
  ${props => props?.$rotate && css`
    animation: ${Spin} 5s linear infinite;
  `}
  & path:nth-child(1) {
    display: none;
  }
`;
const Spin = keyframes`
  100% {
    transform: rotate(360deg)
  }
`