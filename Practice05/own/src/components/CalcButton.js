import React from 'react';
import PropTypes from 'prop-types';

import './CalcButton.scss'

function showNotImplemented() {
  console.warn('This function is not implemented yet.');
}

const CalcButton = (props) => {
  const { className, onClick, symbol, type, width } = props;
  const handleClick = () => { onClick(symbol); };

  const classWidth = (width === 2) ? 'calc-btn-width-2x' : 'calc-btn-width-x';
  let FinalclassName = `calc-${type} ${className}`;

  return (
    <button
      className={`calc-btn ${classWidth} ${FinalclassName}`}
      onClick={handleClick}
    >
      {symbol}
    </button>
  );
};


CalcButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  symbol: PropTypes.string.isRequired,
  type: PropTypes.string,
  width: PropTypes.number
};

CalcButton.defaultProps = {
  onClick: showNotImplemented,
  type: 'number',
  width: 1
};

export default CalcButton;
