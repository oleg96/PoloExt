import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ProgressBar from './ProgressBar.js';
import { expect } from 'chai';

Enzyme.configure({ adapter: new Adapter() })

function setup() {

  const props = {
    percent: 33
  };

  const enzymeWrapper = shallow(<ProgressBar {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('ProgressBar', () => {
  it('should render self', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.find('.progress-bar')).to.have.lengthOf(1);
    expect(enzymeWrapper.find('.progress-bar__percent')).to.have.lengthOf(1);
    expect(enzymeWrapper.find('.progress-bar__nonfilled')).to.have.lengthOf(1);

    const progressBarPercentProps = enzymeWrapper.find('.progress-bar__percent').props();

    expect(progressBarPercentProps.children).to.have.deep.members([33, ' %']);

    const progressBarProgressProps = enzymeWrapper.find('.progress-bar__progress').props();

    expect(progressBarProgressProps.style).to.deep.equal({ width: '33%' });

    const progressBarNonfilledProps = enzymeWrapper.find('.progress-bar__nonfilled').props();

    expect(progressBarNonfilledProps.style).to.deep.equal({ width: '67%' });
  });
});
