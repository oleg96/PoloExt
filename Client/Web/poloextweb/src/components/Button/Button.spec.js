import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from './Button.js';
import Icon from '../Icon/Icon.js';

Enzyme.configure({ adapter: new Adapter() })

function setup() {

  const props = {
    text: 'Test value',
    className: 'button__primary',
    onClick: jest.fn()
  };

  const enzymeWrapper = shallow(<Button {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('Button', () => {
  it('should render self', () => {
    const { enzymeWrapper } = setup();
    const expectedElements = [ <Icon />, 'Test value' ];

    expect(enzymeWrapper.find('button').hasClass('button__primary')).toBe(true);
    expect(enzymeWrapper.find('button').hasClass('button__primary__disabled--false')).toBe(true);

    expect(enzymeWrapper.find('button').text()).toBe('<Icon />Test value');

    const buttonProps = enzymeWrapper.find('button').props();

    expect(buttonProps.onClick).toBeDefined();
    expect(buttonProps.children).toEqual(expect.arrayContaining(expectedElements));
    expect(buttonProps.className).toEqual('button__primary button__primary__disabled--false');
    expect(buttonProps.disabled).toBeDefined();
    expect(buttonProps.type).not.toBeDefined();
  });

  it('should call onClick', () => {
    const { enzymeWrapper, props } = setup();
    const button = enzymeWrapper.find('button');

    button.props().onClick();
    expect(props.onClick.mock.calls.length).toBe(1);
  });
});
