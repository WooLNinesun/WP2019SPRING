import React from 'react';
import PropTypes from 'prop-types';

import './CalcButtonPanel.scss';
import CalcButton from '../components/CalcButton';

function showNotImplemented() {
  console.warn('This function is not implemented yet.');
}

const CalcButtonPanel = (props) => {
  const buttonDatas = [
    { symbol: 'AC', width: 1, type: 'function' },
    { symbol: '+/-', width: 1, type: 'function' },
    { symbol: '%', width: 1, type: 'function' },
    { symbol: '÷', width: 1, type: 'operator' },
    { symbol: '7', width: 1, type: 'number' },
    { symbol: '8', width: 1, type: 'number' },
    { symbol: '9', width: 1, type: 'number' },
    { symbol: 'x', width: 1, type: 'operator' },
    { symbol: '4', width: 1, type: 'number' },
    { symbol: '5', width: 1, type: 'number' },
    { symbol: '6', width: 1, type: 'number' },
    { symbol: '-', width: 1, type: 'operator' },
    { symbol: '1', width: 1, type: 'number' },
    { symbol: '2', width: 1, type: 'number' },
    { symbol: '3', width: 1, type: 'number' },
    { symbol: '+', width: 1, type: 'operator' },
    { symbol: '0', width: 2, type: 'number' },
    { symbol: '.', width: 1, type: 'number' },
    { symbol: '=', width: 1, type: 'operator' }
  ];

  const { handleClick } = props;
  return (
    <div className="calc-panel" >
      {buttonDatas.map(buttonData => (
        <CalcButton key={buttonData.symbol} onClick={handleClick} {...buttonData} />
      ))}
    </div >
  );
};

CalcButtonPanel.propTypes = {
  handleClick: PropTypes.func
};

CalcButtonPanel.defaultProps = {
  handleClick: showNotImplemented
};

export default CalcButtonPanel;
