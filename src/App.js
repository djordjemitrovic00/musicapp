import React from "react";
import { Router } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import i18next from "i18next";
import history from "./store/utils/history";
import AppRoutes from "./AppRoutes";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { StyledEngineProvider } from "@mui/material";

const App = () => {
  return (
    <>
      <Router history={history}>
        <Helmet>
          <title>{i18next.t("app.title")}</title>
        </Helmet>
        <StyledEngineProvider injectFirst>
          <ToastContainer bodyClassName="ToastBody" />
          {/* <main className="l-page"> */}
            <AppRoutes />
          {/* </main> */}
        </StyledEngineProvider>
      </Router>
    </>
  );
};

export default App;
