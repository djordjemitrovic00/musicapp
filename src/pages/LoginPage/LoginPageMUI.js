/* eslint-disable */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  clearLoginErrors,
  fetchUser,
} from "../../store/actions/login/loginActions";
import { selectLoginError } from "../../store/selectors/loginSelectors";
import { FORGOT_PASSWORD_PAGE, HOME_PAGE, REGISTER_PAGE } from "../../constants/pages";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Backdrop from "../../components/MUI/BackdropComponent";
import ErrorMessage from "../../components/MUI/ErrorMessageComponent";
import { selectIsLoadingByActionType } from "../../store/selectors/loadingSelectors";
import { LOGIN_USER_SCOPE } from "../../store/actions/login/loginActionConstants";
import loginValidation from "../../validations/loginValidation";
import loginInitialValues from "../../initialValues/loginInitialValues";
import GoogleIcon from "@mui/icons-material/Google";

const LoginPage = ({ history }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const error = useSelector(selectLoginError);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleGoogle = () => {
    window.location = "http://localhost:1337/api/connect/google";
  };

  // Clear login errors when user firstly enters the page
  useEffect(() => {
    dispatch(clearLoginErrors());
  }, []);

  const isLoading = useSelector(selectIsLoadingByActionType(LOGIN_USER_SCOPE));

  const handleApiResponseSuccess = () => {
    history.push({
      pathname: HOME_PAGE,
      state: {
        from: history.location.pathname,
      },
    });
  };

  const handleSubmit = (values) => {
    const { email, password } = values;
    dispatch(clearLoginErrors());
    dispatch(
      fetchUser({
        identifier: email,
        password,
        handleApiResponseSuccess,
      })
    );
  };

  const formik = useFormik({
    initialValues: loginInitialValues,
    validationSchema: loginValidation,
    onSubmit: handleSubmit,
    validateOnBlur: true,
    enableReinitialize: true,
  });

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 32,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          {t("login.logInTitle")}
        </Typography>
        {error && <ErrorMessage error={error} />}
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ position: "relative", mt: 1, p: 1 }}
        >
          <Backdrop position="absolute" isLoading={isLoading} />
          <TextField
            name="email"
            label={t("common.labelEmail")}
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            autoFocus
            fullWidth
          />
          <TextField
            name="password"
            label={t("common.labelPassword")}
            margin="normal"
            type={showPassword ? "text" : "password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            fullWidth
          >
            {t("login.logIn")}
          </Button>
          <Button
            onClick={handleGoogle}
            startIcon={<GoogleIcon />}
            fullWidth
            variant="outlined"
          >
            Connect with Google
          </Button>
          <Grid container>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ textAlign: { xs: "center", md: "left" } }}
            >
              <Link
                to={FORGOT_PASSWORD_PAGE}
                component={NavLink}
                variant="body2"
                underline="hover"
              >
                {t("login.forgotYourPassword")}
              </Link>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ textAlign: { xs: "center", md: "right" } }}
            >
              <Link
                to={REGISTER_PAGE}
                component={NavLink}
                variant="body2"
                underline="hover"
              >
                {t("login.dontHaveAccount")}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

LoginPage.propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func,
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
};
export default LoginPage;
