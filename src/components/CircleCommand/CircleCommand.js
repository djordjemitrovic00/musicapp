import React from "react";
import PropTypes from "prop-types";
import { CircleCommandContainer } from "./CircleCommand.styled";

const CircleCommand = (props) => {
  return (
    <CircleCommandContainer {...props}>
      {props?.firstCommand}
      {props?.secondCommand}
    </CircleCommandContainer>
  );
};

CircleCommand.propTypes = {
  firstCommand: PropTypes.node,
  secondCommand: PropTypes.node,
};

export default CircleCommand;
