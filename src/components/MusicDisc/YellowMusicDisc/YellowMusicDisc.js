import React from "react";
import PropTypes from "prop-types";
import { YellowMusicDiscContainer } from "./YellowMusicDisc.styled";

const YellowMusicDisc = (props) => {
  return <YellowMusicDiscContainer {...props} />;
};

YellowMusicDisc.propTypes = {
  children: PropTypes.node,
};

export default YellowMusicDisc;
