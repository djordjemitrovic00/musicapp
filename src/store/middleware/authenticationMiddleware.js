import i18next from "i18next";
import { attachPostRequestListener } from "../../request";
import { logoutUser } from "../actions/login/loginActions";
import { makeErrorToastMessage } from "../../util/helpers/toastMessage";

export const authenticationMiddlewareInterceptorName =
  "AUTHENTICATION_MIDDLEWARE";

export default ({ dispatch }) =>
  (next) =>
  (action) => {
    attachPostRequestListener((error) => {
      if (!error.response) {
        makeErrorToastMessage(i18next.t("apiErrors.SomethingWentWrong"));
        return Promise.reject(error);
      }
      if (error.response.status === 401) {
        dispatch(logoutUser());
        return Promise.reject(error);
      }
      return Promise.resolve();
    }, authenticationMiddlewareInterceptorName);

    next(action);
  };
