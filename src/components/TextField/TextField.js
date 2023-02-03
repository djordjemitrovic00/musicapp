import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import {
  TextFieldCluedContainer,
  TextFieldCluedHighlighted,
  TextFieldContainer,
  TextFieldInput,
  TextFieldSingleSuggestion,
  TextFieldSingleSuggestionText,
  TextFieldSingleSuggestionTextHighlighted,
  TextFieldSuggestionsContainer,
} from "./TextField.styled";
import { useDispatch, useSelector } from "react-redux";
import { selectGame, selectSongs } from "../../store/selectors/gameSelectors";
import { fetchListSongs } from "../../store/actions/game/gameActions";

const TextField = (props) => {
  const containerRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useDispatch();
  const songs = useSelector(selectGame);
  const songAnswers = useSelector(selectSongs);

  const values = useMemo(() => {
    if (!songs) return [];
    return songAnswers;
  }, [songAnswers]);

  useEffect(() => {
    if (props?.searchSongs)
      dispatch(
        fetchListSongs({
          searchTerm: props?.value,
        })
      );
  }, [props?.searchSongs, props?.value]);

  const handleFocusField = () => {
    setIsFocused(true);
  };

  const handleGuessSong = (event, songName) => {
    setIsFocused(false);
    props?.handleGuessSong(songName);
  };

  const checkFocus = useCallback(
    (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target))
        setIsFocused(false);
    },
    [containerRef?.current]
  );

  useEffect(() => {
    document.addEventListener("mousedown", checkFocus.bind(this));
    return () => {
      document.removeEventListener("mousedown", checkFocus.bind(this));
    };
  }, []);

  return (
    <TextFieldContainer
      ref={containerRef}
      onFocus={handleFocusField}
      backgroundColor={props?.backgroundColor}
    >
      {props?.clue && (
        <TextFieldCluedContainer contentEditable>
          {props?.clue?.[0]}
          <TextFieldCluedHighlighted>
            {props?.clue?.[1]}
          </TextFieldCluedHighlighted>
          {props?.clue?.[2]}
        </TextFieldCluedContainer>
      )}
      {!props?.clue && (
        <TextFieldInput
          placeholder="Guess the song..."
          {...props}
          inputProps={{ autocomplete: "off" }}
        />
      )}
      {props?.value?.length > 0 && isFocused && !props?.hideSuggestions && (
        <TextFieldSuggestionsContainer
          onClick={(event) => event.preventDefault()}
        >
          {values?.map((singleValue) => {
            if (
              !singleValue?.toLowerCase()?.includes(props?.value?.toLowerCase())
            )
              return;
            const firstValue = singleValue?.slice(
              0,
              singleValue?.toLowerCase().indexOf(props?.value?.toLowerCase())
            );
            const secondValue = singleValue?.slice(
              singleValue?.toLowerCase().indexOf(props?.value?.toLowerCase()),
              singleValue?.toLowerCase().indexOf(props?.value?.toLowerCase()) +
                props?.value?.toLowerCase()?.length
            );
            const thirdValue = singleValue?.slice(
              singleValue?.toLowerCase().indexOf(props?.value?.toLowerCase()) +
                props?.value?.toLowerCase()?.length
            );
            return (
              <TextFieldSingleSuggestion
                key={singleValue}
                onClick={(event) => handleGuessSong(event, singleValue)}
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
    </TextFieldContainer>
  );
};

TextField.propTypes = {
  children: PropTypes.node,
  value: PropTypes.string,
  backgroundColor: PropTypes.string,
  handleGuessSong: PropTypes.func,
  hideSuggestions: PropTypes.bool,
  clue: PropTypes.bool,
  searchSongs: PropTypes.bool,
};

export default TextField;
