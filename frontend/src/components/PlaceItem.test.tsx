import React from 'react';
import { shallow } from 'enzyme';
import PlaceItem from './PlaceItem';

describe('<PlaceItem />', () => {
    it('should render without errors', () => {
        const component = shallow(<PlaceItem place={{
            id: 1,
            name: "ex1",
            kakao_id: 1,
            post_id: 1,
            description: "ex1",
            day: 1,
            folder_id: 1,
            latitude: "1",
            longitude: "1",
            lat: "1",
            lon: "1",
            homepage: "ex1",
            phone_number: "ex1",
            address: "ex1",
            category: "ex1",
            index: 1,
        }} />);
        const wrapper = component.find('.place-item-container');
        expect(wrapper.length).toBe(1);
    });
})
