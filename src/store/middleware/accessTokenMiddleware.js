import axios from "axios";
import jwt from "jsonwebtoken";
import { JWT_REFRESH_TOKEN, JWT_TOKEN } from "../../constants/localStorage";
import { attachBeforeRequestListener } from "../../request/index";
import { authScopeStringGetHelper } from "../../util/helpers/authScopeHelpers";
import { logoutUser, refreshUserToken } from "../actions/login/loginActions";

export const accessTokensMiddlewareInterceptorName = "ACCESS_TOKEN_INTERCEPTOR";

export default ({ dispatch }) =>
  (next) =>
  (action) => {
    attachBeforeRequestListener(async (response) => {
      const jwtToken = authScopeStringGetHelper(JWT_TOKEN);
      const refresh = authScopeStringGetHelper(JWT_REFRESH_TOKEN);
      if (!jwtToken || !refresh) return Promise.resolve(response);
      const jwtTokenDecoded = jwt.decode(jwtToken);
      const refreshTokenDecoded = jwt.decode(refresh);
      if (!response.headers?.Authorization) {
        response.headers.Authorization = `Bearer ${jwtToken}`;
      }

      // If refresh token is expired, log out user
      if (new Date() > new Date(refreshTokenDecoded?.exp * 1000)) {
        dispatch(logoutUser());
        return Promise.resolve(response);
      }

      // If access token is expired, refresh access token
      if (new Date() > new Date(jwtTokenDecoded.exp * 1000)) {
        const axiosResponse = await axios.post(
          'http://localhost:1337/api/token/refresh',
          {
            refreshToken: refresh,
          },
          {
            headers: { Authorization: `Bearer ${jwtToken}` },
          }
        );
        const newTokens = axiosResponse.data;

        response.headers.Authorization = `Bearer ${newTokens.jwt}`;

        dispatch(refreshUserToken(newTokens));
      }

      return Promise.resolve(response);
    }, accessTokensMiddlewareInterceptorName);

    next(action);
  };
