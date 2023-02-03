import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage, useField } from 'formik';
import CurrencyInput from 'react-currency-input-field';
import { formatMoneyNumeral } from '../../util/helpers/numeralHelpers';
import {
  PLUS_SYMBOL,
  MINUS_SYMBOL,
  NUMPAD_MINUS_SYMBOL,
  NUMPAD_PLUS_SYMBOL,
  K_KEYCODE,
} from '../../constants/keyCodeConstants';

const CurrencyField = ({
  autoFocus,
  notCentered,
  notBold,
  label,
  onChange,
  value,
  ...props
}) => {
  const [field, meta] = useField(props);
  const inputField = useRef(null);
  function styles() {
    let style = 'c-currency-field';

    if (meta.error && meta.touched) {
      style += ` c-currency-field--error`;
    }

    if (notCentered) {
      style += ` c-currency-field--not-centered`;
    }

    if (notBold) {
      style += ` c-currency-field--not-bold`;
    }

    return style;
  }

  useEffect(() => {
    if (autoFocus) {
      inputField.current.focus();
    }
  }, [autoFocus, inputField]);

  const onKeydownHandler = (event) => {
    if (
      event.keyCode === MINUS_SYMBOL ||
      event.keyCode === PLUS_SYMBOL ||
      event.keyCode === NUMPAD_MINUS_SYMBOL ||
      event.keyCode === NUMPAD_PLUS_SYMBOL ||
      event.keyCode === K_KEYCODE
    ) {
      event.preventDefault();
    }
  };

  const prefix = formatMoneyNumeral(0);
  const prefixSymbol = () => {
    if (prefix.includes('CAD')) {
      return 'CAD ';
    }

    return '$';
  };

  return (
    <div className={styles()}>
      {!!label && (
        <label className="c-currency-field__label" htmlFor={field.name}>
          {label}
        </label>
      )}
      {value ? (
        <CurrencyInput
          {...props}
          prefix={prefixSymbol()}
          onValueChange={(value) => {
            onChange(value ? Number(value) : '');
          }}
          onKeyDown={(event) => onKeydownHandler(event)}
          ref={inputField}
          defaultValue={0}
          value={value}
        />
      ) : (
        <CurrencyInput
          {...props}
          prefix={prefixSymbol()}
          onValueChange={(value) => {
            onChange(value ? Number(value) : '');
          }}
          onKeyDown={(event) => onKeydownHandler(event)}
          ref={inputField}
        />
      )}
      <ErrorMessage name={field.name}>
        {(errorMessage) => (
          <span className="c-currency-field__error">{errorMessage}</span>
        )}
      </ErrorMessage>
    </div>
  );
};

CurrencyField.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string,
  }),
  form: PropTypes.shape({}),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  autoFocus: PropTypes.bool,
  notCentered: PropTypes.bool,
  notBold: PropTypes.bool,
  value: PropTypes.number,
};

export default CurrencyField;
