import { all, call, put, takeLatest } from "@redux-saga/core/effects";
import jwt from "jsonwebtoken";
import history from "../utils/history";
import {
  AUTHENTICATE_USER,
  LOGIN_USER_FETCH,
  LOGOUT_USER,
  REFRESH_TOKEN,
} from "../actions/login/loginActionConstants";
import { attemptLogin, logoutUserRequest } from "../../request/loginRequest";
import {
  fetchUserError,
  fetchUserSuccess,
  resetLoginState,
  updateUserToken,
} from "../actions/login/loginActions";
import { LOGIN_PAGE } from "../../constants/pages";
import { setUser } from "../actions/user/userActions";
import { addHeaderToken, removeHeaderToken } from "../../request";
import {
  JWT_REFRESH_TOKEN,
  JWT_TOKEN,
  REFRESH_TOKEN_CONST,
} from "../../constants/localStorage";
import {
  authScopeClearHelper,
  authScopeStringGetHelper,
  authScopeRemoveHelper,
  authScopeSetHelper,
} from "../../util/helpers/authScopeHelpers";
import { rejectErrorCodeHelper } from "../../util/helpers/rejectErrorCodeHelper";

function* fetchUser({ payload }) {
  try {
    const { data } = yield call(attemptLogin, payload);
    if (data?.jwt) {
      const user = data?.user;
      yield call(authScopeSetHelper, JWT_TOKEN, data.jwt);
      yield call(authScopeSetHelper, JWT_REFRESH_TOKEN, data?.refreshToken);
      yield call(addHeaderToken, data?.jwt);
      yield put(setUser(user));
    }
    yield put(fetchUserSuccess(data));
    if (payload.handleApiResponseSuccess) {
      yield call(payload.handleApiResponseSuccess);
    }
  } catch (e) {
    if (e.response && e.response.data) {
      const errorMessage = yield call(rejectErrorCodeHelper, e);
      yield put(fetchUserError(errorMessage));
    }
  }
}
function* authenticateUser() {
  try {
    const JwtToken = yield call(authScopeStringGetHelper, JWT_TOKEN);

    if (!JwtToken) {
      yield call(history.push, LOGIN_PAGE);
    }

    return yield put(
      fetchUserSuccess({
        JwtToken,
      })
    );
  } catch (error) {
    const errorMessage = yield call(rejectErrorCodeHelper, error);
    yield put(fetchUserError(errorMessage));
    yield call(authScopeRemoveHelper, JWT_TOKEN);
    yield call(authScopeRemoveHelper, JWT_REFRESH_TOKEN);
    yield call(authScopeRemoveHelper, REFRESH_TOKEN_CONST);
  }
}

function* logoutUser() {
  try {
    const token = yield call(authScopeStringGetHelper, JWT_REFRESH_TOKEN);
    const user = yield call(jwt.decode, token);
    if (user) {
      yield call(logoutUserRequest);
    }
  } catch (error) {
    console.log(error); // eslint-disable-line
  } finally {
    yield call(authScopeClearHelper);
    yield call(removeHeaderToken);
    yield put(resetLoginState());
    yield call(history.replace, LOGIN_PAGE);
  }
}

export function* refreshToken({ payload }) {
  try {
    const newTokenDecoded = jwt.decode(payload.jwt);

    yield call(authScopeSetHelper, JWT_TOKEN, payload.jwt);
    yield call(authScopeSetHelper, JWT_REFRESH_TOKEN, payload.refreshToken);
    addHeaderToken(payload.jwt);
    yield put(setUser(newTokenDecoded));
    yield put(updateUserToken(payload.jwt));
    return true;
  } catch (error) {
    console.log(error); // eslint-disable-line
    return false;
  }
}

export default function* loginSaga() {
  yield all([
    takeLatest(LOGIN_USER_FETCH, fetchUser),
    takeLatest(AUTHENTICATE_USER, authenticateUser),
    takeLatest(LOGOUT_USER, logoutUser),
    takeLatest(REFRESH_TOKEN, refreshToken),
  ]);
}
