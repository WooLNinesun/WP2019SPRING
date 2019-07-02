import React from 'react';
import PropTypes from 'prop-types';

import './CalcOutput.scss';

const CalcOutput = (props) => {
  const { children, value, operation } = props;

  return (
    <div className="calc-output">
      <div className="calc-display operator">{operation} {value}</div>
      <div className="calc-display number">{children}</div>
    </div>
  );
};

CalcOutput.propTypes = {
  children: PropTypes.string,
  value: PropTypes.string,
  operation: PropTypes.string
};

CalcOutput.defaultProps = {
  children: "0"
};

export default CalcOutput;
