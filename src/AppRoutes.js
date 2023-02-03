import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import {
  HOME_PAGE,
  NOT_FOUND_PAGE,
  ERROR_PAGE,
  BASE_PAGE,
} from "./constants/pages";

import HomePage from "./pages/HomePage/HomePageMUI";
import NotFoundPage from "./pages/ErrorPages/NotFoundPage";
import ErrorPage from "./pages/ErrorPages/ErrorPage";

const AppRoutes = () => (
  <Switch>
    <Route exact path={BASE_PAGE} component={HomePage} />
    <Route path={NOT_FOUND_PAGE} component={NotFoundPage} />
    <Route path={ERROR_PAGE} component={ErrorPage} />
    <Route exact path={HOME_PAGE} component={HomePage} />
    <Redirect from="*" to={NOT_FOUND_PAGE} />
  </Switch>
);

export default AppRoutes;
