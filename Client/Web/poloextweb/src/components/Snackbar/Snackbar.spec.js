import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Snackbar from './Snackbar.js';

Enzyme.configure({ adapter: new Adapter() })

function setup() {

  const props = {
    message: 'Test value',
    open: true,
    autoHideDuration: 4000,
    onClose: jest.fn()
  };

  const enzymeWrapper = shallow(<Snackbar {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

function setupSecond() {

  const props = {
    message: '',
    open: false,
    autoHideDuration: 4000
  };

  const enzymeWrapper = shallow(<Snackbar {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('Snackbar', () => {
  it('should render self', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.find('p').text()).toBe('Test value');

    const snackbarProps = enzymeWrapper.find('p').props();

    expect(snackbarProps.children).toEqual('Test value');
  });

  it('should hide after 4 seconds', () => {
    jest.useFakeTimers();

    const {enzymeWrapper} = setup();
    const props = enzymeWrapper.props();

    setTimeout(() => {
      expect(props.onClose.mock.calls.length).toBe(1);
      expect(props.open).toEqual(false);
      done();
    }, 5000);
  });

  it('should no render self', () => {
    const { enzymeWrapper } = setupSecond();

    expect(enzymeWrapper.find('div').hasClass('snackbar--invisible')).toBe(true);
  });
});
