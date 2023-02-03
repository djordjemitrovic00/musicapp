import React, { useMemo } from "react";
import PropTypes from "prop-types";
import {
  LifeDisc,
  PlayerLivesContainer,
  PlayerLivesLine,
  SinglePlayerLive,
} from "./PlayerLives.styled";
import { HAS_LIFE, NO_LIFE } from "../../constants/livesConstants";
import { ORANGE_DISC } from "../../constants/discColors";

const PlayerLives = (props) => {
  const lives = useMemo(() => {
    let firstLine = [];
    let secondLine = [];
    for (let i = 0; i < 15; i++) {
      secondLine.push(props?.noOfLives > i ? HAS_LIFE : NO_LIFE);
      firstLine.push(props?.noOfLives > i + 15 ? HAS_LIFE : NO_LIFE);
    }
    return {
      firstLine,
      secondLine,
    };
  }, [props?.noOfLives]);

  console.log(lives);
  return (
    <PlayerLivesContainer>
      <PlayerLivesLine>
        {/* &nbsp; */}
        {lives?.firstLine?.map((item, index) => (
          <SinglePlayerLive key={index}>
            {item === HAS_LIFE ? <LifeDisc discColor={ORANGE_DISC} /> : <></>}
          </SinglePlayerLive>
        ))}
        {/* &nbsp; */}
      </PlayerLivesLine>
      <PlayerLivesLine>
        {/* &nbsp; */}
        {lives?.secondLine?.map((item, index) => (
          <SinglePlayerLive key={index}>
            {item === HAS_LIFE ? <LifeDisc discColor={ORANGE_DISC} /> : <></>}
          </SinglePlayerLive>
        ))}
        {/* &nbsp; */}
      </PlayerLivesLine>
    </PlayerLivesContainer>
  );
};

PlayerLives.propTypes = {
  noOfLives: PropTypes.number,
};

export default PlayerLives;
