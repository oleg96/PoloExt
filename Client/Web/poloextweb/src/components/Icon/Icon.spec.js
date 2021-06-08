import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Icon from './Icon.js';

Enzyme.configure({ adapter: new Adapter() })

function setup() {

  const props = {
    iconName: 'input'
  };

  const enzymeWrapper = shallow(<Icon {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

function setupSecond() {

  const props = {};

  const enzymeWrapper = shallow(<Icon {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

function setupThird() {

  const props = {
    iconName: 'input',
    hasPadding: true
  };

  const enzymeWrapper = shallow(<Icon {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('Icon', () => {
  it('should render self', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.find('i').hasClass('material-icons')).toBe(true);
    expect(enzymeWrapper.find('i').hasClass('icon_padding--false')).toBe(true);

    const iconProps = enzymeWrapper.find('i').props();

    expect(iconProps.children).toBe('input');
  });

  it('should not render self', () => {
    const { enzymeWrapper } = setupSecond();

    expect(enzymeWrapper.find('i').exists()).toEqual(false);
  });

  it('should render self with padding', () => {
    const { enzymeWrapper } = setupThird();

    expect(enzymeWrapper.find('i').hasClass('material-icons')).toBe(true);
    expect(enzymeWrapper.find('i').hasClass('icon_padding--true')).toBe(true);

    const iconProps = enzymeWrapper.find('i').props();

    expect(iconProps.children).toBe('input');
  });
});
