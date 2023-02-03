import React from "react";
import PropTypes from "prop-types";
import { RedMusicDiscContainer } from "./RedMusicDisc.styled";

const RedMusicDisc = (props) => {
  return <RedMusicDiscContainer {...props} />;
};

RedMusicDisc.propTypes = {
  children: PropTypes.node,
};

export default RedMusicDisc;
