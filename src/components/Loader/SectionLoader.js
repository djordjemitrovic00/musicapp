import React from 'react';
import PropTypes from 'prop-types';

const SectionLoader = ({ children, isLoading }) => (
  <div className="c-loader__wrapper">
    {children}
    {isLoading && (
      <div className="c-loader">
        <div className="c-loader__icon" />
      </div>
    )}
  </div>
);

SectionLoader.propTypes = {
  children: PropTypes.node,
  isLoading: PropTypes.bool,
};

export default SectionLoader;
