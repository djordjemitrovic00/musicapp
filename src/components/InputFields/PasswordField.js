import React, { useState } from 'react';
import PropTypes from 'prop-types';

import BaseInputField from './BaseInputField';
import PasswordStrength from './PasswordStrength';

const PasswordField = ({
  field,
  form,
  label,
  placeholder,
  disabled,
  shouldTestPasswordStrength,
  autoFocus,
  ...props
}) => {
  const [passwordValue, setPasswordValue] = useState('');
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);

  const onChange = (e) => {
    if (shouldTestPasswordStrength) {
      const { value } = e.target;
      setPasswordValue(value);
    }

    field.onChange(e);
  };

  const onKeyDown = (keyEvent) => {
    if (keyEvent.getModifierState('CapsLock')) {
      setIsCapsLockOn(true);
    } else {
      setIsCapsLockOn(false);
    }
  };

  return (
    <div className="c-password">
      <BaseInputField
        type="password"
        label={label}
        placeholder={placeholder}
        disabled={disabled}
        form={form}
        field={field}
        {...props}
        onChange={onChange}
        autoFocus={autoFocus}
        onKeyDown={onKeyDown}
        isCapsLockOn={isCapsLockOn}
      />
      {shouldTestPasswordStrength && (
        <PasswordStrength
          passwordValue={passwordValue}
          shouldTestPasswordStrength
        />
      )}
    </div>
  );
};

PasswordField.propTypes = {
  field: PropTypes.shape({
    onChange: PropTypes.func,
  }),
  form: PropTypes.shape({}),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  shouldTestPasswordStrength: PropTypes.bool,
  autoFocus: PropTypes.bool,
};

export default PasswordField;
