import React from 'react';
import { shallow } from 'enzyme';
import UserInfoPage from './UserInfoPage'

describe('<PostItem />', () => {
  it('should render without errors', () => {
    const component = shallow(<UserInfoPage/>);
    const wrapper = component.find('.UserInfoPage');
    expect(wrapper.length).toBe(1);
  });
})
