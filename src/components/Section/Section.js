import React from 'react';
import PropType from 'prop-types';

const Section = ({ children, className }) => (
  <section className={`l-section ${className || ''}`}>{children}</section>
);

Section.propTypes = {
  children: PropType.node,
  className: PropType.string,
};

export default Section;
