import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import rootSaga from "./saga";
import loadingMiddleware from "./middleware/loadingMiddleware";
import requestStatusMiddleware from "./middleware/requestStatusMiddleware";
import internalServerErrorMiddleware from "./middleware/internalServerErrorMiddleware";
// import accessTokenMiddleware from "./middleware/accessTokenMiddleware";
// import authenticationMiddleware from "./middleware/authenticationMiddleware";

const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
      traceLimit: 25,
    })) ||
  compose;
const sagaMiddleware = createSagaMiddleware();
export default createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      sagaMiddleware,
      loadingMiddleware,
      requestStatusMiddleware,
      internalServerErrorMiddleware,
      // accessTokenMiddleware,
      //authenticationMiddleware
    )
  )
);

sagaMiddleware.run(rootSaga);
