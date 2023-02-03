import { createSelector } from "reselect";

const gameSelector = (state) => state.game;

export const selectQuestion = (questionIndex) =>
  createSelector(gameSelector, (state) => state?.questions?.songs?.[`${questionIndex}`]);

export const selectGame = createSelector(
  gameSelector,
  (state) => state.questions
);

export const selectSongs = createSelector(
  gameSelector,
  (state) => state.songs
);

export const selectLinks = createSelector(
  gameSelector,
  (state) => state.links
);
