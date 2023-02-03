import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import {
  EyeIcon,
  GuessSongFieldContainer,
  GuessTextField,
  MelodyIcon,
} from "./GuessSongField.styled";
import PlayingDisc from "../MusicDisc/PlayingDisc/PlayingDisc";
import CircleCommand from "../CircleCommand/CircleCommand";
import DiscLosingProgress from "../DiscLosingProgress/DiscLosingProgress";
import {
  GREEN_DISC,
  ORANGE_DISC,
  RED_DISC,
  WHITE_DISC,
} from "../../constants/discColors";
import {
  CORRECT_FIELD_STATE,
  INITIAL_FIELD_STATE,
  OVER_FIELD_STATE,
  WRONG_FIELD_STATE,
} from "../../constants/fieldStates";
import { useDispatch } from "react-redux";
import { fetchGuessSong } from "../../store/actions/game/gameActions";

const GuessSongField = forwardRef((props, ref) => {
  const [textValue, setTextValue] = useState("");
  const fieldLives = useRef(3);
  const [fieldState, setFieldState] = useState(INITIAL_FIELD_STATE);
  const [isEnded, setIsEnded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [losingTimeout, setLosingTimeout] = useState();
  const [song, setSong] = useState();
  const dispatch = useDispatch();

  const clue = useMemo(() => {
    console.log(props?.cluesRevealed);
    if (!props?.cluesRevealed) return null;
    if (fieldState === CORRECT_FIELD_STATE || fieldState === OVER_FIELD_STATE)
      return [
        props?.songName?.slice(
          0,
          props?.songName?.toLowerCase().indexOf(props?.hint?.toLowerCase())
        ),
        props?.songName?.slice(
          props?.songName?.toLowerCase().indexOf(props?.hint?.toLowerCase()),
          props?.songName?.toLowerCase().indexOf(props?.hint?.toLowerCase()) +
            props?.hint?.toLowerCase()?.length
        ),
        props?.songName?.slice(
          props?.songName?.toLowerCase().indexOf(props?.hint?.toLowerCase()) +
            props?.hint?.toLowerCase()?.length
        ),
      ];
    return null;
  }, [props?.cluesRevealed, fieldState]);

  const loseLife = () => {
    if (fieldLives?.current > 0) {
      if (fieldLives?.current === 1) loseField();
      fieldLives.current = fieldLives?.current - 1;
      props?.loseLife();
    }
  };

  const giveUp = () => {
    if (
      fieldState !== CORRECT_FIELD_STATE &&
      fieldState !== OVER_FIELD_STATE &&
      !props?.disabled
    ) {
      let remainingLives = fieldLives?.current;
      for (let i = 0; i < remainingLives; i++) {
        loseLife();
      }
    }
  };

  const loseField = () => {
    setFieldState(OVER_FIELD_STATE);
    setTextValue(props?.songName);
    song?.pause();
    clearTimeout(losingTimeout);
    setLosingTimeout();
  };

  const discColor = useMemo(() => {
    if (fieldState === WRONG_FIELD_STATE || fieldState === OVER_FIELD_STATE)
      return RED_DISC;
    if (fieldState === CORRECT_FIELD_STATE) return GREEN_DISC;
    if (!isLoaded) return WHITE_DISC;
    return ORANGE_DISC;
  }, [fieldState, isLoaded]);

  useImperativeHandle(ref, () => ({
    textValue,
    setTextValue,
    playSong,
    song,
  }));

  const endedSongHandler = () => {
    setLosingTimeout();
    setIsEnded(true);
  };

  useEffect(() => {
    if (song) {
      song.addEventListener("ended", endedSongHandler);
    }
    return () => song?.removeEventListener("ended", endedSongHandler);
  }, [song]);

  useEffect(() => {
    if (fieldState === OVER_FIELD_STATE || fieldState === CORRECT_FIELD_STATE)
      props?.solveField();
  }, [fieldState]);

  useEffect(() => {
    if (props?.songUrl) {
      setSong(new Audio(props?.songUrl));
    }
  }, [props?.songUrl]);

  const changeTextValue = (event) => {
    if (
      fieldState !== CORRECT_FIELD_STATE &&
      fieldState !== OVER_FIELD_STATE &&
      !props?.disabled
    )
      setTextValue(event.target.value);
  };

  const guessSong = (guessedSong) => {
    setTextValue(guessedSong);
    dispatch(
      fetchGuessSong({
        answer: guessedSong,
        id: props?.songId,
      })
    );
    if (fieldLives?.current > 0)
      if (guessedSong === props?.songName) {
        setFieldState(CORRECT_FIELD_STATE);
        setIsEnded(true);
      } else {
        setFieldState(WRONG_FIELD_STATE);
        setTextValue("Please try again");
        loseLife();
      }
  };

  const losingLifeTimeoutFunction = useCallback(
    (timeoutTime) => {
      setLosingTimeout(
        setTimeout(() => {
          if (fieldLives?.current > 0) {
            loseLife();
          }
          if (!song?.paused) losingLifeTimeoutFunction(3000);
        }, Math.ceil(timeoutTime))
      );
    },
    [fieldLives?.current, song, loseLife]
  );

  const playSong = () => {
    if (!isEnded && !props?.disabled) {
      if (song.paused) {
        if (!isLoaded) setIsLoaded(true);
        song.play();
        losingLifeTimeoutFunction(3000 - ((song.currentTime * 1000) % 3000));
      } else {
        song.pause();
        clearTimeout(losingTimeout);
        setLosingTimeout();
      }
    }
  };

  return (
    <GuessSongFieldContainer>
      <PlayingDisc
        rotating={losingTimeout}
        discColor={discColor}
        onClick={playSong}
      />
      <GuessTextField
        handleGuessSong={guessSong}
        clue={clue}
        searchSongs={
          textValue !== "Please try again" &&
          fieldState !== OVER_FIELD_STATE &&
          fieldState !== CORRECT_FIELD_STATE &&
          textValue?.length !== 0
        }
        value={textValue}
        hideSuggestions={
          fieldLives?.current === 0 ||
          fieldState === CORRECT_FIELD_STATE ||
          fieldState === OVER_FIELD_STATE
        }
        onChange={changeTextValue}
        backgroundColor={
          fieldState === OVER_FIELD_STATE
            ? "red"
            : fieldState === CORRECT_FIELD_STATE && "green"
        }
      />
      <CircleCommand
        onClick={giveUp}
        firstCommand={<MelodyIcon />}
        secondCommand={<EyeIcon />}
      />
      <DiscLosingProgress noOfLives={fieldLives?.current} />
    </GuessSongFieldContainer>
  );
});

GuessSongField.displayName = "GuessSongField";

GuessSongField.propTypes = {
  children: PropTypes.node,
  text: PropTypes.string,
  songUrl: PropTypes.string,
  songName: PropTypes.string,
  hint: PropTypes.string,
  wrong: PropTypes.bool,
  correct: PropTypes.bool,
  cluesRevealed: PropTypes.bool,
  disabled: PropTypes.bool,
  loseLife: PropTypes.func,
  solveField: PropTypes.func,
  songId: PropTypes.string,
};

export default GuessSongField;
