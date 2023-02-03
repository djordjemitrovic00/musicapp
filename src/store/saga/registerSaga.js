import { all, call, put, takeLatest } from "@redux-saga/core/effects";
import { REGISTER_USER_FETCH } from "../actions/register/registerActionConstants";
import { attemptRegister } from "../../request/loginRequest";
import {
  registerUserError,
  registerUserSuccess,
} from "../actions/register/registerActions";
import { JWT_TOKEN } from "../../constants/localStorage";
import { authScopeSetHelper } from "../../util/helpers/authScopeHelpers";
import { rejectErrorCodeHelper } from "../../util/helpers/rejectErrorCodeHelper";

function* registerUser({ payload }) {
  try {
    const { data } = yield call(attemptRegister, payload);
    if (data?.jwt) {
      yield call(authScopeSetHelper, JWT_TOKEN, data.jwt);
    }
    yield put(registerUserSuccess(data.jwt));
    if (payload.handleApiResponseSuccess) {
      yield call(payload.handleApiResponseSuccess);
    }
  } catch (e) {
    if (e.response && e.response.data) {
      const errorMessage = yield call(rejectErrorCodeHelper, e);
      yield put(registerUserError(errorMessage));
    }
  }
}

export default function* registerSaga() {
  yield all([takeLatest(REGISTER_USER_FETCH, registerUser)]);
}
