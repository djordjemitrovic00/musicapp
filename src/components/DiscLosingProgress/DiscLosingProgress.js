import React, { useMemo } from "react";
import PropTypes from "prop-types";
import {
  DiscLosingProgressContainer,
  LifeDisc,
  SinglePlayerLive,
} from "./DiscLosingProgress.styled";
import { HAS_LIFE, NO_LIFE } from "../../constants/livesConstants";
import { RED_DISC } from "../../constants/discColors";

const DiscLosingProgress = (props) => {
  const lives = useMemo(() => {
    let livesArray = [];
    for (let i = 0; i < 3; i++) {
      if (props?.noOfLives > i) livesArray.push(HAS_LIFE);
      else livesArray.push(NO_LIFE);
    }
    return livesArray;
  }, [props?.noOfLives]);
  return (
    <DiscLosingProgressContainer onClick={props?.onClick}>
      {lives.map((singleLife, index) => (
        <SinglePlayerLive key={index}>
          {singleLife === HAS_LIFE ? <LifeDisc discColor={RED_DISC} /> : <></>}
        </SinglePlayerLive>
      ))}
    </DiscLosingProgressContainer>
  );
};

DiscLosingProgress.propTypes = {
  noOfLives: PropTypes.number,
  onClick: PropTypes.func,
};

export default DiscLosingProgress;
