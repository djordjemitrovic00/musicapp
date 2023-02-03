import { Box } from "@mui/material";
import styled from "styled-components";
import MusicDisc from "../MusicDisc/MusicDisc";

export const PlayerLivesContainer = styled(Box)``;
export const PlayerLivesLine = styled(Box)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 3px;
  margin-bottom: 5px;
  height: calc(400px / 100 * 5);
  @media (max-width: 600px) {
    height: 5vw;
  }
`;
export const SinglePlayerLive = styled(Box)`
  width: calc(400px / 100 * 5.4);
  @media (max-width: 600px) {
    width: 5vw;
  }
`;
export const LifeDisc = styled(MusicDisc)`
  width: 100%;
  height: 100%;
`;
