import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import PasswordField from '../../components/InputFields/PasswordField';
import Button from '../../components/Button/Button';
import TextField from '../../components/InputFields/TextField';
import Auth from '../../components/Auth/Auth';
import AuthCard from '../../components/AuthCards/AuthCard';
import {
  clearLoginErrors,
  fetchUser,
} from '../../store/actions/login/loginActions';
import {
  selectLoginError,
} from '../../store/selectors/loginSelectors';
import {
  FORGOT_PASSWORD_PAGE, HOME_PAGE,
} from '../../constants/pages';
import { selectIsLoadingByActionType } from '../../store/selectors/loadingSelectors';
import { LOGIN_USER_LOADING } from '../../store/actions/login/loginActionConstants';

const LoginValidationSchema = Yup.object().shape({
  username:  Yup.string().required(i18next.t('login.usernameRequired')),
  password: Yup.string().required(i18next.t('login.passwordRequired')),
});

const LoginPage = ({ history }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const error = useSelector(selectLoginError);

  // When user refreshes page
  // useEffect(() => {
  //   function redirectClient() {
  //     if (!tokens.RefreshToken && !tokens.JwtToken) {
  //       return
  //     }
  //   }

  //   redirectClient();
  // }, [history, tokens]);

  const isLoading = useSelector(
    selectIsLoadingByActionType(LOGIN_USER_LOADING),
  );
  const handleApiResponseSuccess =()=>{
    history.push({
      pathname: HOME_PAGE,
      state: {
        from: history.location.pathname,
      },
    });
  }
  const handleSubmit = (values) => {
      // destructure value as username.
      const { username: Username } = values;
      const { password: Password } = values;
      dispatch(clearLoginErrors());
      dispatch(
        fetchUser({
          Username,
          Password,
          handleApiResponseSuccess
        },
        ),
      );
  };

  return (
    <Auth>
    <AuthCard
      title="Log In"
      isLoading={isLoading}
    >
        <div className="c-login c-login--user">
          <div className="c-login__form">
            <Formik
              initialValues={{
                username: '',
                password: '',
              }}
              onSubmit={handleSubmit}
              validationSchema={LoginValidationSchema}
              validateOnBlur
              enableReinitialize
            >
              {({ values }) => (
                <Form>
                  <Field
                   label={t('common.labelUsername')}
                    value={values.username.value}
                    component={TextField}
                    name="username"
                  />
                  <Field
                    label={
                      <div className="c-login--password__label">
                        {t('common.labelPassword')}
                      </div>
                    }
                    link={
                        <NavLink
                          to={FORGOT_PASSWORD_PAGE}
                        >
                          {t('login.forgotYourPassword')}
                        </NavLink>
                    }
                    name="password"
                    component={PasswordField}
                    errorMessage={error}
                    autoFocus
                  />
                  <Button
                    className="c-login__button"
                    authButton
                    variant="primary"
                    type="submit"
                  >
                    {t('common.continue')}
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        </AuthCard>
        </Auth>
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
