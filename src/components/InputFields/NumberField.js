import React from 'react';
import PropTypes from 'prop-types';

import BaseInputField from './BaseInputField';
import {
  PERIOD_SYMBOL,
  COMMA_SYMBOL,
  PLUS_SYMBOL,
  MINUS_SYMBOL,
  NUMPAD_PERIOD_SYMBOL,
  NUMPAD_MINUS_SYMBOL,
  NUMPAD_PLUS_SYMBOL,
  DOWN_ARROW_KEYCODE,
  UP_ARROW_KEYCODE,
} from '../../constants/keyCodeConstants';

const NumberField = ({
  field,
  form,
  label,
  placeholder,
  disabled,
  preventAllExceptNumbers,
  ...props
}) => {
  const onKeydownHandler = (event) => {
    if (preventAllExceptNumbers) {
      if (
        event.keyCode === PERIOD_SYMBOL ||
        event.keyCode === COMMA_SYMBOL ||
        event.keyCode === NUMPAD_PERIOD_SYMBOL ||
        event.keyCode === DOWN_ARROW_KEYCODE ||
        event.keyCode === UP_ARROW_KEYCODE
      ) {
        event.preventDefault();
      }
    }

    if (
      event.keyCode === PLUS_SYMBOL ||
      event.keyCode === MINUS_SYMBOL ||
      event.keyCode === NUMPAD_MINUS_SYMBOL ||
      event.keyCode === NUMPAD_PLUS_SYMBOL ||
      event.keyCode === DOWN_ARROW_KEYCODE ||
      event.keyCode === UP_ARROW_KEYCODE
    ) {
      event.preventDefault();
    }
  };

  return (
    <BaseInputField
      type="number"
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      form={form}
      field={field}
      {...props}
      onKeyDown={(event) => onKeydownHandler(event)}
    />
  );
};

NumberField.propTypes = {
  field: PropTypes.shape({}),
  form: PropTypes.shape({}),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
  placeholder: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool,
  preventAllExceptNumbers: PropTypes.bool,
};

export default NumberField;
