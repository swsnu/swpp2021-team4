import React from 'react';
import { shallow } from 'enzyme';
import SearchInfo from './SearchInfo';

describe('<SearchInfo />', () => {
  it('should render without errors', () => {
    const component = shallow(<SearchInfo />);
    const wrapper = component.find('.search-info');
    expect(wrapper.length).toBe(1);
  });
})
