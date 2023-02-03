import { all } from "redux-saga/effects";
import loginSaga from "./loginSaga";
import registerSaga from "./registerSaga";
import authProviderSaga from "./authProviderSaga";
import gameSaga from "./gameSaga";

export default function* rootSaga() {
  yield all([loginSaga(), registerSaga(), authProviderSaga(), gameSaga()]);
}
