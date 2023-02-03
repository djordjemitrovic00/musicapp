import { all, call, put, takeLatest } from "@redux-saga/core/effects";
import { attemptAuthProvider } from "../../request/loginRequest";
import {
  fetchUserError,
  fetchUserSuccess,
} from "../actions/login/loginActions";
import { setUser } from "../actions/user/userActions";
import { addHeaderToken } from "../../request";
import {
  JWT_REFRESH_TOKEN,
  JWT_TOKEN,
} from "../../constants/localStorage";
import {
  authScopeSetHelper,
} from "../../util/helpers/authScopeHelpers";
import { rejectErrorCodeHelper } from "../../util/helpers/rejectErrorCodeHelper";
import { AUTH_PROVIDER_FETCH } from "../actions/authProvider/authProviderActionConstants";
import { fetchAuthProviderError, fetchAuthProviderSuccess } from "../actions/authProvider/authProviderActions";

function* fetchAuthProvider({ payload }) {
  try {
    const { data } = yield call(attemptAuthProvider, payload.provider, payload.search);
    if (data?.jwt) {
      const user = data?.user;
      yield call(authScopeSetHelper, JWT_TOKEN, data.jwt);
      yield call(authScopeSetHelper, JWT_REFRESH_TOKEN, data?.refreshToken);
      yield call(addHeaderToken, data?.jwt);
      yield put(setUser(user));
    }
    yield put(fetchUserSuccess(data));
    yield put (fetchAuthProviderSuccess('Success'))
    if (payload.handleApiResponseSuccess) {
      yield call(payload.handleApiResponseSuccess);
    }
  } catch (e) {
    if (e.response && e.response.data) {
      const errorMessage = yield call(rejectErrorCodeHelper, e);
      yield put(fetchUserError(errorMessage));
      yield put(fetchAuthProviderError('Error'))
    }
  }
}

export default function* authProviderSaga() {
  yield all([
    takeLatest(AUTH_PROVIDER_FETCH, fetchAuthProvider),
  ]);
}
