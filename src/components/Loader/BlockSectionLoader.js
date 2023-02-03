import React from 'react';
import PropTypes from 'prop-types';

const BlockSectionLoader = ({ children, isLoading, fullHeight, noShadow }) => (
  <div
    className={`c-loader__wrapper c-loader__wrapper--block ${
      fullHeight ? 'c-loader__wrapper--full-height' : ''
    } ${noShadow ? 'c-loader__wrapper--no-shadow' : ''}`}
  >
    {children}
    {isLoading && (
      <div className="c-loader">
        <div className="c-loader__icon" />
      </div>
    )}
  </div>
);

BlockSectionLoader.propTypes = {
  children: PropTypes.node,
  isLoading: PropTypes.bool,
  fullHeight: PropTypes.bool,
  noShadow: PropTypes.bool,
};

export default BlockSectionLoader;
