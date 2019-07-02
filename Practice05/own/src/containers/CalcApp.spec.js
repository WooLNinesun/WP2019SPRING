import React from 'react';
import { mount } from 'enzyme';

import CalcApp from './CalcApp';
import CalcButton from '../components/CalcButton';

const symbols = [
  'AC', '+/-', '%', '÷',
  '7', '8', '9', 'x',
  '4', '5', '6', '-',
  '1', '2', '3', '+',
  '0', '.', '='
];

function initGetButtonByValue(app) {
  const btns = app.find('.calc-panel');
  return (symbol) => btns.find(CalcButton).at(symbols.indexOf(symbol));
}

it('render button correctly', () => {
  const app = mount(<CalcApp />);
  const getButtonByValue = initGetButtonByValue(app);

  symbols.forEach(symbol => {
    expect(getButtonByValue(symbol).text()).toBe(symbol);
  });
});

it('7 8 9 -> 789', () => {
  const app = mount(<CalcApp />);
  const getButtonByValue = initGetButtonByValue(app);

  const btn7 = getButtonByValue('7');
  const btn8 = getButtonByValue('8');
  const btn9 = getButtonByValue('9');

  btn7.simulate('click');
  btn8.simulate('click');
  btn9.simulate('click');

  expect(app.find('.calc-display.number').text()).toBe('789');
});

it('7 8 9 - 8 = -> 781', () => {
  const app = mount(<CalcApp />);
  const getButtonByValue = initGetButtonByValue(app);

  const btn7 = getButtonByValue('7');
  const btn8 = getButtonByValue('8');
  const btn9 = getButtonByValue('9');
  const btnMinus = getButtonByValue('-');
  const btnEqual = getButtonByValue('=');

  btn7.simulate('click');
  btn8.simulate('click');
  btn9.simulate('click');
  btnMinus.simulate('click');
  btn8.simulate('click');
  btnEqual.simulate('click');

  expect(app.find('.calc-display.number').text()).toBe('781');
});

it('7 - 8 -> 8', () => {
  const app = mount(<CalcApp />);
  const getButtonByValue = initGetButtonByValue(app);

  const btn7 = getButtonByValue('7');
  const btn8 = getButtonByValue('8');
  const btnMinus = getButtonByValue('-');

  btn7.simulate('click');
  btnMinus.simulate('click');
  btn8.simulate('click');

  expect(app.find('.calc-display.number').text()).toBe('8');
});

it('7 - + 8 -> 8', () => {
  const app = mount(<CalcApp />);
  const getButtonByValue = initGetButtonByValue(app);

  const btn7 = getButtonByValue('7');
  const btn8 = getButtonByValue('8');
  const btnMinus = getButtonByValue('-');
  const btnAdd = getButtonByValue('+');

  btn7.simulate('click');
  btnMinus.simulate('click');
  btnAdd.simulate('click');
  btn8.simulate('click');

  expect(app.find('.calc-display.number').text()).toBe('8');
});

it('7 - + 8 - -> 15', () => {
  const app = mount(<CalcApp />);
  const getButtonByValue = initGetButtonByValue(app);

  const btn7 = getButtonByValue('7');
  const btn8 = getButtonByValue('8');
  const btnMinus = getButtonByValue('-');
  const btnAdd = getButtonByValue('+');

  btn7.simulate('click');
  btnMinus.simulate('click');
  btnAdd.simulate('click');
  btn8.simulate('click');
  btnMinus.simulate('click');

  expect(app.find('.calc-display.number').text()).toBe('15');
});

it('7 8 9 - 8 - -> 781', () => {
  const app = mount(<CalcApp />);
  const getButtonByValue = initGetButtonByValue(app);

  const btn7 = getButtonByValue('7');
  const btn8 = getButtonByValue('8');
  const btn9 = getButtonByValue('9');
  const btnMinus = getButtonByValue('-');

  btn7.simulate('click');
  btn8.simulate('click');
  btn9.simulate('click');
  btnMinus.simulate('click');
  btn8.simulate('click');
  btnMinus.simulate('click');

  expect(app.find('.calc-display.number').text()).toBe('781');
});

it('4 * 5 = 0 -> 0', () => {
  const app = mount(<CalcApp />);
  const getButtonByValue = initGetButtonByValue(app);

  const btn4 = getButtonByValue('4');
  const btn5 = getButtonByValue('5');
  const btn0 = getButtonByValue('0');
  const btnMultiple = getButtonByValue('x');
  const btnEqual = getButtonByValue('=');

  btn4.simulate('click');
  btnMultiple.simulate('click');
  btn5.simulate('click');
  btnEqual.simulate('click');
  btn0.simulate('click');

  expect(app.find('.calc-display.number').text()).toBe('0');
});

it('1 + 2 = 3 = -> 5', () => {
  const app = mount(<CalcApp />);
  const getButtonByValue = initGetButtonByValue(app);

  const btn1 = getButtonByValue('1');
  const btn2 = getButtonByValue('2');
  const btn3 = getButtonByValue('3');
  const btnAdd = getButtonByValue('+');
  const btnEqual = getButtonByValue('=');

  btn1.simulate('click');
  btnAdd.simulate('click');
  btn2.simulate('click');
  btnEqual.simulate('click');
  btn3.simulate('click');
  btnEqual.simulate('click');

  expect(app.find('.calc-display.number').text()).toBe('5');
});

it('AC should clear state', () => {
  const app = mount(<CalcApp />);
  const getButtonByValue = initGetButtonByValue(app);

  const btn7 = getButtonByValue('7');
  const btnAC = getButtonByValue('AC');

  const initialState = app.state();

  btn7.simulate('click');
  btnAC.simulate('click');

  expect(app.state()).toEqual(initialState);
});

