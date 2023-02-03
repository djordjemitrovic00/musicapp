import {
  GAME_ERROR,
  GAME_FETCH,
  GAME_SET,
  GAME_SUCCESS,
  GUESS_SONG_ERROR,
  GUESS_SONG_FETCH,
  GUESS_SONG_SET,
  GUESS_SONG_SUCCESS,
  GUESS_LINK_ERROR,
  GUESS_LINK_FETCH,
  GUESS_LINK_SET,
  GUESS_LINK_SUCCESS,
  LIST_SONGS_ERROR,
  LIST_SONGS_FETCH,
  LIST_SONGS_SET,
  LIST_SONGS_SUCCESS,
  LIST_SONGS_CLEAR,
  LIST_LINKS_ERROR,
  LIST_LINKS_FETCH,
  LIST_LINKS_SET,
  LIST_LINKS_SUCCESS,
  LIST_LINKS_CLEAR
} from "./gameActionConstants";

export const fetchGame = (payload) => ({
  type: GAME_FETCH,
  payload,
});

export const fetchGameSuccess = (payload) => ({
  type: GAME_SUCCESS,
  payload,
});

export const fetchGameError = (payload) => ({
  type: GAME_ERROR,
  payload,
});

export const setGame = (payload) => ({
  type: GAME_SET,
  payload,
});

export const fetchGuessSong = (payload) => ({
  type: GUESS_SONG_FETCH,
  payload,
});

export const fetchGuessSongSuccess = (payload) => ({
  type: GUESS_SONG_SUCCESS,
  payload,
});

export const fetchGuessSongError = (payload) => ({
  type: GUESS_SONG_ERROR,
  payload,
});

export const setGuessSong = (payload) => ({
  type: GUESS_SONG_SET,
  payload,
});

export const fetchGuessLink = (payload) => ({
  type: GUESS_LINK_FETCH,
  payload,
});

export const fetchGuessLinkSuccess = (payload) => ({
  type: GUESS_LINK_SUCCESS,
  payload,
});

export const fetchGuessLinkError = (payload) => ({
  type: GUESS_LINK_ERROR,
  payload,
});

export const setGuessLink = (payload) => ({
  type: GUESS_LINK_SET,
  payload,
});

export const fetchListSongs = (payload) => ({
  type: LIST_SONGS_FETCH,
  payload,
});

export const fetchListSongsSuccess = (payload) => ({
  type: LIST_SONGS_SUCCESS,
  payload,
});

export const fetchListSongsError = (payload) => ({
  type: LIST_SONGS_ERROR,
  payload,
});

export const setListSongs = (payload) => ({
  type: LIST_SONGS_SET,
  payload,
});

export const clearListSongs = (payload) => ({
  type: LIST_SONGS_CLEAR,
  payload,
});

export const fetchListLinks = (payload) => ({
  type: LIST_LINKS_FETCH,
  payload,
});

export const fetchListLinksSuccess = (payload) => ({
  type: LIST_LINKS_SUCCESS,
  payload,
});

export const fetchListLinksError = (payload) => ({
  type: LIST_LINKS_ERROR,
  payload,
});

export const setListLinks = (payload) => ({
  type: LIST_LINKS_SET,
  payload,
});

export const clearListLinks = (payload) => ({
  type: LIST_LINKS_CLEAR,
  payload,
});
