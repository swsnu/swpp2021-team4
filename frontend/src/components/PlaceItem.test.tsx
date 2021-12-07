import React from 'react';
import { shallow } from 'enzyme';
import PlaceItem from './PlaceItem';

describe('<PlaceItem />', () => {
    it('should render without errors', () => {
        const component = shallow(<PlaceItem place={{ id: 1, name: '', description: '' }} />);
        const wrapper = component.find('.place-item-container');
        expect(wrapper.length).toBe(1);
    });
})
