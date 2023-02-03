import { GAME_SET, GUESS_LINK_SET, GUESS_SONG_SET, LIST_LINKS_CLEAR, LIST_LINKS_SET, LIST_SONGS_CLEAR, LIST_SONGS_SET } from "../../actions/game/gameActionConstants";
import createReducer from "../../utils/createReducer";

const initialState = {
  questions: 0,
  songs: [],
  links: [],
  guessedSong: false,
  guessedLink: false,
};
export default createReducer(
  {
    [GAME_SET]: setGame,
    [LIST_SONGS_SET]: setSongsList,
    [LIST_SONGS_CLEAR]: clearSongsList,
    [LIST_LINKS_SET]: setLinksList,
    [GUESS_SONG_SET]: setGuessSongResult,
    [GUESS_LINK_SET]: setGuessLinkResult,
    [LIST_LINKS_CLEAR]: clearLinksList,
  },
  initialState
);

function setGame(state, { payload }) {
  return {
    ...state,
    questions: payload,
  };
}

function setSongsList(state, { payload }) {
  return {
    ...state,
    songs: payload,
  };
}

function clearSongsList(state) {
  return {
    ...state,
    songs: initialState.songs,
  };
}

function setLinksList(state, { payload }) {
  return {
    ...state,
    links: payload,
  };
}

function setGuessSongResult(state, { payload }) {
  return {
    ...state,
    guessedSong: payload,
  };
}

function setGuessLinkResult(state, { payload }) {
  return {
    ...state,
    guessedLink: payload,
  };
}

function clearLinksList(state) {
  return {
    ...state,
    links: initialState.links,
  };
}
