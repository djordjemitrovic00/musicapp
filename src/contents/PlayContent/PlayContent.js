import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  ClueButton,
  GuessesContainer,
  PlayContentContainer,
} from "./PlayContent.styled";
import PlayerLives from "../../components/PlayerLives/PlayerLives";
import GameTitle from "../../components/GameTitle/GameTitle";
import SmallerSeparator from "../../components/Separators/SmallerSeparator/SmallerSeparator";
import GuessSongField from "../../components/GuessSongField/GuessSongField";
import CircleCommand from "../../components/CircleCommand/CircleCommand";
import { ReactComponent as Glasses } from "../../assets/images/svg/glasses.svg";
import DiscLosingProgress from "../../components/DiscLosingProgress/DiscLosingProgress";
import { useDispatch, useSelector } from "react-redux";
import { selectGame } from "../../store/selectors/gameSelectors";
import { fetchGame } from "../../store/actions/game/gameActions";
import LinkTextField from "../../components/TextField/LinkTextField/LinkTextField";

const PlayContent = () => {
  const game = useSelector(selectGame);
  const [lives, setLives] = useState(30);
  const [solvedFields, setSolvedFields] = useState(0);
  const [cluesRevealed, setCluesRevealed] = useState(0);
  const [gameOver, setGameOver] = useState();
  console.log(game);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGame());
  }, []);

  const loseLife = () => {
    if (lives > 0) setLives((prevLives) => prevLives - 1);
  };

  const solveField = () => {
    setSolvedFields((prevSolvedFields) => prevSolvedFields + 1);
  };

  const revealClues = () => {
    if (!cluesRevealed && !gameOver) {
      setLives((prevLives) => prevLives - 3);
      setCluesRevealed(true);
    }
  };

  return (
    <PlayContentContainer>
      <GameTitle />
      <PlayerLives noOfLives={lives} />
      <SmallerSeparator />
      <GuessesContainer>
        {game?.songs?.map((singleSong) => (
          <GuessSongField
            cluesRevealed={cluesRevealed}
            loseLife={loseLife}
            disabled={gameOver}
            solveField={solveField}
            key={singleSong?.id}
            songUrl={singleSong?.url}
            hint={singleSong?.hint}
            songName={singleSong?.name}
            artist={singleSong?.artist}
            songId={singleSong?.id}
          />
        ))}
      </GuessesContainer>
      <SmallerSeparator />
      {solvedFields >= 2 && (
        <ClueButton>
          <CircleCommand onClick={revealClues} firstCommand={<Glasses />} />
          <DiscLosingProgress noOfLives={cluesRevealed ? 0 : 3} />
        </ClueButton>
      )}
      {solvedFields >= 2 && (
        <LinkTextField
          answers={game?.answers}
          loseLife={loseLife}
          totalLives={lives}
          questionId={game?.id}
          gameOver={() => setGameOver(true)}
        />
      )}
    </PlayContentContainer>
  );
};

PlayContent.propTypes = {
  children: PropTypes.node,
};

export default PlayContent;
