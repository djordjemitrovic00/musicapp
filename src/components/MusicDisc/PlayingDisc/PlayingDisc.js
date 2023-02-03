import React from "react";
import PropTypes from "prop-types";
import {
  DiscIcon,
  PauseIcon,
  PlayIcon,
  PlayingCommands,
  PlayingDiscContainer,
} from "./PlayingDisc.styled";
import { ORANGE_DISC } from "../../../constants/discColors";

const PlayingDisc = (props) => {
  console.log(props)
  return (
    <PlayingDiscContainer {...props}>
      <DiscIcon $rotate={props?.rotating} discColor={props?.discColor} />
      <PlayingCommands>
        <PlayIcon />
        <PauseIcon />
      </PlayingCommands>
    </PlayingDiscContainer>
  );
};

PlayingDisc.propTypes = {
  children: PropTypes.node,
  discColor: PropTypes.string,
  rotating: PropTypes.bool,
};

PlayingDisc.defaultProps = {
  discColor: ORANGE_DISC
}

export default PlayingDisc;
