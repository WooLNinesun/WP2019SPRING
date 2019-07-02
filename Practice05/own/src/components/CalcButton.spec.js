import React from 'react';
import { mount } from 'enzyme';

import CalcButton from './CalcButton';

it('can assign extra class to button', () => {
  const buttonData = { symbol: '1', width: 1, type: 'number' };
  const element = mount(
    <CalcButton {...buttonData}
      className="extra"
    />
  );

  expect(element.find('button').prop('className')).toMatch(/extra/);
});

it('call props.onClick when button be clicked', () => {
  const onClick = jest.fn();
  const buttonData = { symbol: '1', width: 1, type: 'number' };
  const element = mount(
    <CalcButton {...buttonData}
      onClick={onClick}
    />
  );

  const button = element.find('button');
  button.simulate('click');

  expect(onClick).toBeCalled();
});


