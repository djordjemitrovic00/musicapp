import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

import TextField from './TextField';

const PercentageField = ({ field, ...props }) => {
  const handleOnChange = (percentageField) => {
    const { floatValue } = percentageField;

    if (!props.onChange) {
      throw Error('Provide an onChange handler');
    }
    if (floatValue > 100) {
      return props.onChange('100');
    }

    if (floatValue <= 0 || !floatValue) {
      return props.onChange('0');
    }

    return props.onChange(floatValue.toString());
  };

  return (
    <NumberFormat
      format="###%"
      value={field.value}
      customInput={TextField}
      field={field}
      {...props}
      onValueChange={handleOnChange}
      onChange={() => {}}
    />
  );
};

PercentageField.propTypes = {
  onChange: PropTypes.func,
  field: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

export default PercentageField;
