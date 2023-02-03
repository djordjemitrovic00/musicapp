import { attachPostRequestListener } from "../../request";
import apiEndpoints from "../../request/apiEndpoints";
import { logoutUser } from "../actions/login/loginActions";

export const requestStatusMiddlewareInterceptorName =
  "REQUEST_STATUS_MIDDLEWARE_INTERCEPTOR";

export default ({ dispatch }) =>
  (next) =>
  (action) => {
    attachPostRequestListener((error) => {
      if (!error.response) {
        return Promise.reject(error);
      }
      if (
        error.response.config.url !== apiEndpoints.authentications.login &&
        error.response.status === 401
      ) {
        return dispatch(logoutUser());
      }
      return Promise.reject(error);
    }, requestStatusMiddlewareInterceptorName);

    next(action);
  };
