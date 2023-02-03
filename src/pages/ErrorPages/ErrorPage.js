import React from 'react';
import { useTranslation } from 'react-i18next';

const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <div className="c-error-page">
        <div className="c-error-page__content">
          <h1 className="c-error-page__title">500</h1>
          <p className="c-error-page__text">{t('errorPage.text')}</p>
        </div>
    </div>
  );
};

ErrorPage.propTypes = {};

export default ErrorPage;
