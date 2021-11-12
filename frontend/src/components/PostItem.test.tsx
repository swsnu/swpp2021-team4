import React from 'react';
import { shallow } from 'enzyme';
import PostItem from './PostItem';

describe('<PostItem />', () => {
  it('should render without errors', () => {
    const component = shallow(<PostItem id={0} title={''} author_name={''} author_id={0} />);
    const wrapper = component.find('.postitem-container');
    expect(wrapper.length).toBe(1);
  });
})
