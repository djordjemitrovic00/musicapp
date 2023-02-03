import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const Auth = ({ children }) => {
  const { t } = useTranslation();

  return (
    <div className="c-auth">
      <h1 className="c-auth__title">{t(`login.welcome`)}</h1>
      {children}
    </div>
  );
};

Auth.propTypes = {
  children: PropTypes.node,
};

export default Auth;
