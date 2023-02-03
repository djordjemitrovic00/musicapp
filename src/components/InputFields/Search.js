import React from 'react';
import PropTypes from 'prop-types';

import BaseInputField from './BaseInputField';

const Search = ({
  field,
  form,
  label,
  placeholder,
  disabled,
  className,
  ...props
}) => (
  <BaseInputField
    type="text"
    label=""
    placeholder={placeholder}
    disabled={disabled}
    form={form}
    field={field}
    isSearch
    className={className}
    {...props}
  />
);

Search.propTypes = {
  field: PropTypes.shape({}),
  form: PropTypes.shape({}),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Search;
