import React from "react";
import PropTypes from "prop-types";
import { GameTitleContainer } from "./GameTitle.styled";

const GameTitle = () => {
  return <GameTitleContainer>Criptyc DJ</GameTitleContainer>;
};

GameTitle.propTypes = {
  children: PropTypes.node,
};

export default GameTitle;
