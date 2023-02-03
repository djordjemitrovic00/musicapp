import { attachPostRequestListener } from "../../request";
import { makeErrorToastMessage } from "../../util/helpers/toastMessage";
import i18next from "i18next";

export const serverErrorMiddlewareInterceptorName =
  "INTERNAL_SERVER_ERROR_MIDDLEWARE_INTERCEPTOR";

export default () => (next) => (action) => {
  attachPostRequestListener((error) => {
    if (!error.response) {
      return makeErrorToastMessage(i18next.t("apiErrors.SomethingWentWrong"));
    }
    if (error.response.status === 500) {
      return makeErrorToastMessage(i18next.t("apiErrors.SomethingWentWrong"));
    }
    return Promise.reject(error);
  }, serverErrorMiddlewareInterceptorName);

  next(action);
};
