import { getRequest, postRequest, replaceInUrl } from ".";
import apiEndpoints from "./apiEndpoints";

export const attemptFetchAllGames = () =>
  getRequest(apiEndpoints.game.getAllGames);

export const attemptFetchSingleGame = (payload) =>
  getRequest(
    replaceInUrl(apiEndpoints.game.getSingleGame, {
      id: payload,
    })
  );

export const attemptPostGameAnswer = (payload) =>
  postRequest(
    replaceInUrl(apiEndpoints.game.postGameAnswer, {
      id: payload?.id,
    }),
    payload.answer
  );

export const attemptPostSongAnswer = (payload) =>
  postRequest(
    replaceInUrl(apiEndpoints.game.postQuestionAnswer, {
      id: payload?.id,
    }),
    payload.answer
  );

export const attemptFetchSongs = (payload) =>
  getRequest(apiEndpoints.game.getSongs, payload);

export const attemptFetchLinks = (payload) =>
  getRequest(apiEndpoints.game.getLinks, payload);
