import React from 'react';
import PropTypes from 'prop-types';

import BaseInputField from './BaseInputField';

const EmailField = ({
  field,
  form,
  label,
  placeholder,
  disabled,
  ...props
}) => (
  <BaseInputField
    type="email"
    label={label}
    placeholder={placeholder}
    disabled={disabled}
    form={form}
    field={field}
    {...props}
  />
);

EmailField.propTypes = {
  field: PropTypes.shape({}),
  form: PropTypes.shape({}),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

export default EmailField;
