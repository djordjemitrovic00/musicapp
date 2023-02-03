import React from 'react';
import PropTypes from 'prop-types';

import BaseInputField from './BaseInputField';
import {
  BACKSPACE_KEYCODE,
  TAB_KEYCODE,
  RIGHT_ARROW_KEYCODE,
  LEFT_ARROW_KEYCODE,
} from '../../constants/keyCodeConstants';

const TextField = ({
  field,
  form,
  label,
  placeholder,
  disabled,
  centerText,
  autoFocus,
  preventAllExceptNumbers,
  ...props
}) => {
  const onKeydownHandler = (event) => {
    if (preventAllExceptNumbers) {
      if (
        event.keyCode === BACKSPACE_KEYCODE ||
        event.keyCode === TAB_KEYCODE ||
        event.keyCode === RIGHT_ARROW_KEYCODE ||
        event.keyCode === LEFT_ARROW_KEYCODE
      ) {
        return;
      }

      if (
        (event.keyCode < 58 && event.keyCode > 47) ||
        (event.keyCode < 106 && event.keyCode > 95)
      ) {
        return;
      }

      event.preventDefault();
    }
  };

  return (
    <BaseInputField
      autoFocus={autoFocus}
      type="text"
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      form={form}
      field={field}
      centerText={centerText}
      {...props}
      onKeyDown={(event) => onKeydownHandler(event)}
    />
  );
};

TextField.propTypes = {
  field: PropTypes.shape({}),
  form: PropTypes.shape({}),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  centerText: PropTypes.bool,
  autoFocus: PropTypes.bool,
  preventAllExceptNumbers: PropTypes.bool,
};

export default TextField;
