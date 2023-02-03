import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import i18next from 'i18next';
import Auth from '../../components/Auth/Auth';
import AuthCard from '../../components/AuthCards/AuthCard';
import TextField from '../../components/InputFields/TextField';
import Button from '../../components/Button/Button';

import Section from '../../components/Section/Section';

const forgotPasswordValidationSchema = Yup.object().shape({
  email: Yup.string().required(
    i18next.t('login.securityQuestion.answerRequired'),
  ),
});

const ForgotPasswordPage = () => {
  const { t } = useTranslation();

  const handleSubmit = (values) => {
      console.log("Values",values)
  };

  return (
    <Auth>
      <AuthCard
        title={t('forgotPassword.title')}
      >
        <Section>
          <div className="c-reset-security">
            <div className="c-reset-security__form">
              <Formik
                onSubmit={handleSubmit}
                initialValues={{ email: '' }}
                validationSchema={forgotPasswordValidationSchema}
              >
                <Form>
                  <Field
                    label={t('login.forgotPasswordEmail')}
                    name="email"
                    component={TextField}
                  />
                  <Button
                    className="c-reset-security__button"
                    authButton
                    variant="primary"
                    type="submit"
                  >
                    {t('forgotPassword.label')}
                  </Button>
                </Form>
              </Formik>
            </div>
          </div>
        </Section>
      </AuthCard>
    </Auth>
  );
};

export default ForgotPasswordPage;
