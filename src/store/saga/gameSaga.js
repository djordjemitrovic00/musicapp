import { all, call, put, takeLatest } from "@redux-saga/core/effects";
import { rejectErrorCodeHelper } from "../../util/helpers/rejectErrorCodeHelper";
import {
  fetchGameError,
  fetchGameSuccess,
  fetchGuessLinkError,
  fetchGuessLinkSuccess,
  fetchGuessSongError,
  fetchGuessSongSuccess,
  fetchListLinksError,
  fetchListLinksSuccess,
  fetchListSongsError,
  fetchListSongsSuccess,
  setGame,
  setGuessLink,
  setGuessSong,
  setListLinks,
  setListSongs,
} from "../actions/game/gameActions";
import {
  attemptFetchAllGames,
  attemptFetchLinks,
  attemptFetchSingleGame,
  attemptFetchSongs,
  attemptPostGameAnswer,
  attemptPostSongAnswer,
} from "../../request/gameRequest";
import {
  GAME_FETCH,
  GUESS_LINK_FETCH,
  GUESS_SONG_FETCH,
  LIST_LINKS_FETCH,
  LIST_SONGS_FETCH,
} from "../actions/game/gameActionConstants";

function* fetchGame({ payload }) {
  try {
    const allGames = yield call(attemptFetchAllGames);
    const singleGame = yield call(attemptFetchSingleGame, allGames.data?.id);
    yield put(setGame(singleGame?.data));
    yield put(fetchGameSuccess());
    if (payload.handleApiResponseSuccess) {
      yield call(payload.handleApiResponseSuccess);
    }
  } catch (e) {
    if (e.response && e.response.data) {
      const errorMessage = yield call(rejectErrorCodeHelper, e);
      yield put(fetchGameError(errorMessage));
    }
  }
}

function* fetchSongs({ payload }) {
  try {
    const queryString = new URLSearchParams();
    queryString.set("pageNumber", 1);
    queryString.set("pageSize", 200);
    queryString.set("searchTerm", payload?.searchTerm);
    const songs = yield call(attemptFetchSongs, queryString);
    yield put(setListSongs(songs?.data));
    yield put(fetchListSongsSuccess());
    if (payload.handleApiResponseSuccess) {
      yield call(payload.handleApiResponseSuccess);
    }
  } catch (e) {
    if (e.response && e.response.data) {
      const errorMessage = yield call(rejectErrorCodeHelper, e);
      yield put(fetchListSongsError(errorMessage));
    }
  }
}

function* fetchLinks({ payload }) {
  try {
    const queryString = new URLSearchParams();
    queryString.set("pageNumber", 1);
    queryString.set("pageSize", 100);
    queryString.set("searchTerm", payload?.searchTerm);
    const links = yield call(attemptFetchLinks, queryString);
    yield put(setListLinks(links?.data));
    yield put(fetchListLinksSuccess());
    if (payload.handleApiResponseSuccess) {
      yield call(payload.handleApiResponseSuccess);
    }
  } catch (e) {
    if (e.response && e.response.data) {
      const errorMessage = yield call(rejectErrorCodeHelper, e);
      yield put(fetchListLinksError(errorMessage));
    }
  }
}

function* fetchGuessSong({ payload }) {
  try {
    const guessedSongResult = yield call(attemptPostSongAnswer, {
      answer: {
        answer: payload?.answer,
      },
      id: payload?.id,
    });
    yield put(setGuessSong(guessedSongResult?.data));
    yield put(fetchGuessSongSuccess());
    if (payload.handleApiResponseSuccess) {
      yield call(payload.handleApiResponseSuccess);
    }
  } catch (e) {
    if (e.response && e.response.data) {
      const errorMessage = yield call(rejectErrorCodeHelper, e);
      yield put(fetchGuessSongError(errorMessage));
    }
  }
}

function* fetchGuessLink({ payload }) {
  try {
    const guessedLinkResult = yield call(attemptPostGameAnswer, {
      answer: {
        answer: payload?.answer,
      },
      id: payload?.id,
    });
    yield put(setGuessLink(guessedLinkResult?.data));
    yield put(fetchGuessLinkSuccess());
    if (payload.handleApiResponseSuccess) {
      yield call(payload.handleApiResponseSuccess);
    }
  } catch (e) {
    if (e.response && e.response.data) {
      const errorMessage = yield call(rejectErrorCodeHelper, e);
      yield put(fetchGuessLinkError(errorMessage));
    }
  }
}

export default function* gameSaga() {
  yield all([
    takeLatest(GAME_FETCH, fetchGame),
    takeLatest(LIST_SONGS_FETCH, fetchSongs),
    takeLatest(LIST_LINKS_FETCH, fetchLinks),
    takeLatest(GUESS_LINK_FETCH, fetchGuessLink),
    takeLatest(GUESS_SONG_FETCH, fetchGuessSong),
  ]);
}
