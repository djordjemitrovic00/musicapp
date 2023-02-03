import {
  createClearType,
  createErrorType,
  createFetchType,
  createSetType,
  createSuccessType,
} from "../actionHelpers";

export const GAME_SCOPE = "GAME";
export const GAME_FETCH = createFetchType(GAME_SCOPE);
export const GAME_SUCCESS = createSuccessType(GAME_SCOPE);
export const GAME_ERROR = createErrorType(GAME_SCOPE);
export const GAME_SET = createSetType(GAME_SCOPE);

export const GUESS_SONG_SCOPE = "GUESS_SONG";
export const GUESS_SONG_FETCH = createFetchType(GUESS_SONG_SCOPE);
export const GUESS_SONG_SUCCESS = createSuccessType(GUESS_SONG_SCOPE);
export const GUESS_SONG_ERROR = createErrorType(GUESS_SONG_SCOPE);
export const GUESS_SONG_SET = createSetType(GUESS_SONG_SCOPE);

export const GUESS_LINK_SCOPE = "GUESS_LINK";
export const GUESS_LINK_FETCH = createFetchType(GUESS_LINK_SCOPE);
export const GUESS_LINK_SUCCESS = createSuccessType(GUESS_LINK_SCOPE);
export const GUESS_LINK_ERROR = createErrorType(GUESS_LINK_SCOPE);
export const GUESS_LINK_SET = createSetType(GUESS_LINK_SCOPE);

export const LIST_SONGS_SCOPE = "LIST_SONGS";
export const LIST_SONGS_FETCH = createFetchType(LIST_SONGS_SCOPE);
export const LIST_SONGS_SUCCESS = createSuccessType(LIST_SONGS_SCOPE);
export const LIST_SONGS_ERROR = createErrorType(LIST_SONGS_SCOPE);
export const LIST_SONGS_SET = createSetType(LIST_SONGS_SCOPE);
export const LIST_SONGS_CLEAR = createClearType(LIST_SONGS_SCOPE)

export const LIST_LINKS_SCOPE = "LIST_LINKS";
export const LIST_LINKS_FETCH = createFetchType(LIST_LINKS_SCOPE);
export const LIST_LINKS_SUCCESS = createSuccessType(LIST_LINKS_SCOPE);
export const LIST_LINKS_ERROR = createErrorType(LIST_LINKS_SCOPE);
export const LIST_LINKS_SET = createSetType(LIST_LINKS_SCOPE);
export const LIST_LINKS_CLEAR = createClearType(LIST_LINKS_SCOPE)



