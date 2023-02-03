import React from 'react';
import PropTypes from 'prop-types';
import SectionLoader from '../Loader/SectionLoader';

const AuthCard = ({ children, title, subtitle, isLoading }) => {
  return (
    <div className="c-auth-card">
      <SectionLoader isLoading={isLoading}>
        <h1 className="c-auth-card__title">{title}</h1>
        <h2 className="c-auth-card__subtitle">{subtitle}</h2>
        {children}
      </SectionLoader>
    </div>
  );
};

AuthCard.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default AuthCard;
