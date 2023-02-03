import React, { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  FinishingText,
  GameOverIcon,
  GoButton,
  LinkContainer,
  LinkTextFieldContainer,
  LinkTextInputField,
  TextFieldSingleSuggestion,
  TextFieldSingleSuggestionText,
  TextFieldSingleSuggestionTextHighlighted,
  TextFieldSuggestionsContainer,
} from "./LinkTextField.styled";
import DiscLosingProgress from "../../DiscLosingProgress/DiscLosingProgress";
import { useDispatch, useSelector } from "react-redux";
import { selectLinks } from "../../../store/selectors/gameSelectors";
import {
  fetchGuessLink,
  fetchListLinks,
} from "../../../store/actions/game/gameActions";
import gameStates from "../../../constants/gameStates";

const LinkTextField = (props) => {
  const containerRef = useRef(null);
  const [placeholder, setPlaceholder] = useState("Guess the link");
  const [isFocused, setIsFocused] = useState(false);
  const [linkLives, setLinkLives] = useState(3);
  const [gameState, setGameState] = useState(gameStates.INITIAL);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const answers = useSelector(selectLinks);

  const values = useMemo(() => {
    if (value?.length === 0) return [];
    return answers || [];
  }, [answers, value]);

  useEffect(() => {
    if (value?.length > 0)
      dispatch(
        fetchListLinks({
          searchTerm: value,
        })
      );
  }, [value]);

  const finishingText = useMemo(() => {
    if (gameState === gameStates.WON)
      return `Fantastic!... you got today's Cryptic Link and scored ${props?.totalLives}`;
    return `So close!
    Today's Cryptic link is '${props?.answers?.[0]}' buy you still scored ${props?.totalLives} points`;
  }, [props?.totalLives, gameState]);

  const onFocusHandler = () => {
    setPlaceholder("");
    setIsFocused(true);
  };
  // const onBlurHandler = () => {
  //   setPlaceholder("Guess the link");
  // };
  const onChange = (event) => {
    if (gameState === gameStates.INITIAL) setValue(event?.target?.value);
  };
  const checkFocus = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target))
      setIsFocused(false);
  };

  const isCorrectAnswer = (guess) => {
    return props?.answers?.includes(guess);
  };

  const loseLife = () => {
    setValue("");
    props?.loseLife();
    if (linkLives > 1) {
      setLinkLives((prevLives) => prevLives - 1);
    } else {
      setLinkLives(0);
      setGameState(gameStates.LOST);
      props?.gameOver();
    }
  };

  const winGame = (guess) => {
    setValue(guess);
    setGameState(gameStates.WON);
    props?.gameOver();
  };

  const handleGuessLink = (event, linkGuess) => {
    setIsFocused(false);
    dispatch(
      fetchGuessLink({
        answer: linkGuess,
        id: props?.questionId,
      })
    );
    if (isCorrectAnswer(linkGuess)) {
      winGame(linkGuess);
    } else {
      loseLife();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", checkFocus.bind(this));
    return () => {
      document.removeEventListener("mousedown", checkFocus.bind(this));
    };
  }, []);

  return (
    <LinkContainer>
      <LinkTextFieldContainer onFocus={onFocusHandler} ref={containerRef}>
        <LinkTextInputField
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          inputProps={{ autocomplete: "off" }}
        />
        {value?.length > 0 && gameState !== gameStates.LOST && (
          <GoButton onClick={(event) => handleGuessLink(event, value)}>
            GO
          </GoButton>
        )}
        {gameState === gameStates.LOST && <GameOverIcon />}
        {value?.length > 0 && isFocused && (
          <TextFieldSuggestionsContainer
            onClick={(event) => event.preventDefault()}
          >
            {values?.map((singleValue) => {
              if (!singleValue?.toLowerCase()?.includes(value?.toLowerCase()))
                return;
              const firstValue = singleValue?.slice(
                0,
                singleValue?.toLowerCase().indexOf(value?.toLowerCase())
              );
              const secondValue = singleValue?.slice(
                singleValue?.toLowerCase().indexOf(value?.toLowerCase()),
                singleValue?.toLowerCase().indexOf(value?.toLowerCase()) +
                  value?.toLowerCase()?.length
              );
              const thirdValue = singleValue?.slice(
                singleValue?.toLowerCase().indexOf(value?.toLowerCase()) +
                  value?.toLowerCase()?.length
              );
              return (
                <TextFieldSingleSuggestion
                  key={singleValue}
                  onClick={(event) => handleGuessLink(event, singleValue)}
                >
                  <TextFieldSingleSuggestionText>
                    {firstValue}
                  </TextFieldSingleSuggestionText>
                  <TextFieldSingleSuggestionTextHighlighted>
                    {secondValue}
                  </TextFieldSingleSuggestionTextHighlighted>
                  <TextFieldSingleSuggestionText>
                    {thirdValue}
                  </TextFieldSingleSuggestionText>
                </TextFieldSingleSuggestion>
              );
            })}
          </TextFieldSuggestionsContainer>
        )}
        {linkLives > 0 && <DiscLosingProgress noOfLives={linkLives} />}
      </LinkTextFieldContainer>
      {gameState !== gameStates.INITIAL && (
        <FinishingText>{finishingText}</FinishingText>
      )}
    </LinkContainer>
  );
};

LinkTextField.propTypes = {
  children: PropTypes.node,
  value: PropTypes.string,
  questionId: PropTypes.string,
  onChange: PropTypes.func,
  loseLife: PropTypes.func,
  gameOver: PropTypes.func,
  answers: PropTypes.array,
  totalLives: PropTypes.number,
};

export default LinkTextField;
