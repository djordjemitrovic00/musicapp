import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage, useField } from 'formik';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const PhoneNumberField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const inputErrorClassName =
    meta.error && meta.touched ? 'c-input--error' : '';

  return (
    <div className={`c-input c-phone-number ${inputErrorClassName}`}>
      {!!label && (
        <label className="c-input__label" htmlFor={field.name}>
          {label}
        </label>
      )}
      <PhoneInput
        international
        defaultCountry="US"
        {...field}
        {...props}
        onChange={(value) => {
          props.onPhoneChange(value);
        }}
        countryOptionsOrder={['US']}
      />
      <ErrorMessage name={field.name}>
        {(errorMessage) => (
          <span className="c-input__error">{errorMessage}</span>
        )}
      </ErrorMessage>
    </div>
  );
};

PhoneNumberField.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string,
  }),
  form: PropTypes.shape({}),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onPhoneChange: PropTypes.func,
};

export default PhoneNumberField;
