import styled from "styled-components";
import selectedTheme from "../../../themes";
import MusicDisc from "../MusicDisc";

export const RedMusicDiscContainer = styled(MusicDisc)`
  width: 20px;
  height: 20px;
  & path {
    fill: ${selectedTheme.colors.disc.red};
  }
`;
