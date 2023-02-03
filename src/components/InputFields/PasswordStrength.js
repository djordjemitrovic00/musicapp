import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import owasp from 'owasp-password-strength-test';
import i18next from 'i18next';

owasp.config({
  minOptionalTestsToPass: 3,
});

const passwordStrengthOptions = [
  {
    strength: 'weak',
    color: '#FF5028',
  },
  {
    strength: 'average',
    color: '#FDB942',
  },
  {
    strength: 'good',
    color: '#06BEE7',
  },
  {
    strength: 'strong',
    color: '#00876A',
  },
];

/**
 * User must pass a required test and at least 3 optional.
 * @param result - owasp result
 * @returns {number} - index of password strength 0-3
 */
function getPasswordStrengthIndex(result) {
  // requirement for strong password is required test passed and at least 3 optional tests
  if (result.strong) {
    return 3;
  }

  if (!result.strong && result.optionalTestsPassed >= 3) {
    return 2;
  }

  if (result.optionalTestsPassed <= 0) {
    return 0;
  }

  return result.optionalTestsPassed - 1;
}

const PasswordStrength = ({
  shouldTestPasswordStrength,
  passwordValue,
  passwordStrengthTestsRequired,
}) => {
  const strengthContainer = useRef(null);
  const [passwordStrength, setPasswordStrength] = useState({
    width: 0,
    color: 'red',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (shouldTestPasswordStrength && passwordValue) {
      const bBox = strengthContainer.current.getBoundingClientRect();
      const result = owasp.test(passwordValue);

      const passwordStrengthIndex = getPasswordStrengthIndex(result);
      const passwordOption = passwordStrengthOptions[passwordStrengthIndex];

      const width = !passwordValue
        ? 0
        : (bBox.width * (passwordStrengthIndex + 1)) /
          passwordStrengthTestsRequired;

      setPasswordStrength({ width, color: passwordOption.color });
      const strength = i18next.t(`password.${passwordOption.strength}`);
      setError(i18next.t('login.passwordStrength', { strength }));
    }
  }, [
    passwordValue,
    shouldTestPasswordStrength,
    passwordStrengthTestsRequired,
  ]);

  if (!shouldTestPasswordStrength || !passwordValue) {
    return null;
  }

  const renderError = () => {
    if (!error) {
      return null;
    }
    return (
      <div
        className="c-input--error"
        style={{
          color: passwordStrength.color,
        }}
      >
        {error}
      </div>
    );
  };
  return (
    <div ref={strengthContainer} className="c-password-strength__container">
      <div className="c-password-strength__line--wrapper">
        <div
          className="c-password-strength__line"
          style={{
            backgroundColor: passwordStrength.color,
            width: passwordStrength.width,
          }}
        />
      </div>
      {renderError()}
    </div>
  );
};
PasswordStrength.propTypes = {
  shouldTestPasswordStrength: PropTypes.bool,
  passwordValue: PropTypes.string,
  passwordStrengthTestsRequired: PropTypes.number,
};

PasswordStrength.defaultProps = {
  passwordStrengthTestsRequired: 4,
};

export default PasswordStrength;
