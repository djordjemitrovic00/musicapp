import React from "react";
import PropTypes from "prop-types";
import { MusicDiscContainer } from "./MusicDisc.styled";

const MusicDisc = (props) => {
  return <MusicDiscContainer {...props} />;
};

MusicDisc.propTypes = {
  children: PropTypes.node,
};

export default MusicDisc;
