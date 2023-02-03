/* eslint-disable */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  clearRegisterErrors,
  registerUser,
} from "../../store/actions/register/registerActions";
import { selectRegisterError } from "../../store/selectors/registerSelectors";
import {
  FORGOT_PASSWORD_PAGE,
  HOME_PAGE,
  LOGIN_PAGE,
} from "../../constants/pages";
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
import GoogleIcon from "@mui/icons-material/Google";
import registerInitialValues from "../../initialValues/registerInitialValues";
import registerValidation from "../../validations/registerValidation";
import { REGISTER_USER_SCOPE } from "../../store/actions/register/registerActionConstants";
import { makeToastMessage } from "../../util/helpers/toastMessage";

const RegisterPage = ({ history }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const error = useSelector(selectRegisterError);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleGoogle = () => {
    window.location = "http://localhost:1337/api/connect/google";
  };

  // Clear login errors when user firstly enters the page
  useEffect(() => {
    dispatch(clearRegisterErrors());
  }, []);

  const isLoading = useSelector(
    selectIsLoadingByActionType(REGISTER_USER_SCOPE)
  );

  const handleApiResponseSuccess = () => {
    history.push({
      pathname: LOGIN_PAGE,
      state: {
        from: history.location.pathname,
      },
    });
    makeToastMessage("User successfuly registered. Please login.");
  };

  const handleSubmit = (values) => {
    const { username, email, password } = values;
    dispatch(clearRegisterErrors());
    dispatch(
      registerUser({ username, email, password, handleApiResponseSuccess })
    );
  };

  const formik = useFormik({
    initialValues: registerInitialValues,
    validationSchema: registerValidation,
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
          {t("register.registerTitle")}
        </Typography>
        {error && <ErrorMessage error={error} />}
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ position: "relative", mt: 1, p: 1 }}
        >
          <Backdrop position="absolute" isLoading={isLoading} />
          <TextField
            name="username"
            label={t("common.labelUsername")}
            margin="normal"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            autoFocus
            fullWidth
          />
          <TextField
            name="email"
            label={t("common.labelEmail")}
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
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
            {t("register.registerTitle")}
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
                to={LOGIN_PAGE}
                component={NavLink}
                variant="body2"
                underline="hover"
              >
                {t("login.logIn")}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

RegisterPage.propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func,
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
};
export default RegisterPage;
