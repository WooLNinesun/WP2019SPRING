import React from 'react';

import calculate from "../logic/calculate";

import './CalcApp.scss';
import CalcOutput from '../components/CalcOutput';
import CalcButtonPanel from '../components/CalcButtonPanel';

class CalcApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: null,
      nextValue: null,
      prevValue: null,
      nextOperation: null,
      prevOperation: null,
    };
  }

  handleClick = buttonValue => {
    this.setState(prevState => calculate(prevState, buttonValue));
  };

  render() {
    return (
      <div className="calc-app">
        <div className="calc-container">
          <CalcOutput
            value={this.state.nextValue || this.state.prevValue}
            operation={this.state.nextOperation || this.state.prevOperation}
          >{this.state.nextValue || this.state.total || "0"}</CalcOutput>
          <CalcButtonPanel handleClick={this.handleClick} />
        </div>
      </div>
    );
  }
}

export default CalcApp;
