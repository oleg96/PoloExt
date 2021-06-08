import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Label from './Label.js';

Enzyme.configure({ adapter: new Adapter() })

function setup() {

  const props = {
    text: 'Test value',
    className: 'label__green'
  };

  const enzymeWrapper = shallow(<Label {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('Label', () => {
  it('should render self', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.find('p').hasClass('label__green')).toBe(true);

    expect(enzymeWrapper.find('p').text()).toBe('Test value');

    const labelProps = enzymeWrapper.find('p').props();

    expect(labelProps.children).toEqual('Test value');
    expect(labelProps.className).toEqual('label__green');
  });
});
