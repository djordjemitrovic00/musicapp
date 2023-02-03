import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../components/Button/Button';
import Section from '../../components/Section/Section';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="c-error-page">
      <Section className="c-error-page__content-container">
        <div className="c-error-page__content">
          <h1 className="c-error-page__title">404</h1>
          <p className="c-error-page__text">{t('notFound.text')}</p>
          <Button
            className="c-error-page__button"
            variant="primary-outlined"
          >
            {t('notFound.goBack')}
          </Button>
        </div>
      </Section>
    </div>
  );
};

NotFoundPage.propTypes = {};

export default NotFoundPage;
