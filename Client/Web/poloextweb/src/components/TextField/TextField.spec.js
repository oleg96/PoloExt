import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TextField from './TextField.js';
import Button from '../Button/Button.js';

Enzyme.configure({ adapter: new Adapter() })

function setup() {

  const props = {
    type: 'password',
    className: 'textField',
    id: 'testId',
    placeholder: 'test placeholder'
  };

  const enzymeWrapper = shallow(<TextField {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

function setupSecond() {

  const props = {
    type: 'text',
    className: 'textField',
    id: 'testId',
    placeholder: 'test placeholder',
    error: 'Required'
  };

  const enzymeWrapper = shallow(<TextField {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('TextField', () => {
  it('should render self', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.find('input').hasClass('textField fullWidth')).toBe(true);

    const inputProps = enzymeWrapper.find('input').props();

    expect(inputProps.className).toEqual('textField fullWidth');
    expect(inputProps.type).toEqual('password');
    expect(inputProps.id).toEqual('testId');
    expect(inputProps.placeholder).toEqual('test placeholder');
  });

  it('should render self second', () => {
    const { enzymeWrapper } = setupSecond();

    expect(enzymeWrapper.find('input').hasClass('textField fullWidth')).toBe(true);

    const inputProps = enzymeWrapper.find('input').props();
    const pProps = enzymeWrapper.find('p').props();

    expect(inputProps.className).toEqual('textField fullWidth');
    expect(inputProps.type).toEqual('text');
    expect(inputProps.id).toEqual('testId');
    expect(inputProps.placeholder).toEqual('test placeholder');
    expect(pProps.className).toEqual('textField__error');
  });

  it('should call onChangeVisibilityClick', () => {
    const { enzymeWrapper } = setup();
    const button = enzymeWrapper.find(Button);

    button.simulate('click', { preventDefault() { } });

    enzymeWrapper.update();

    const state = enzymeWrapper.state();

    expect(state.type).toEqual('text');

    button.simulate('click', { preventDefault() { } });

    enzymeWrapper.update();

    const stateOld = enzymeWrapper.state();

    expect(stateOld.type).toEqual('password');
  });
});
