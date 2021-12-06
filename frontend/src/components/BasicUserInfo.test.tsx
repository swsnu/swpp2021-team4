import React from 'react';
import { shallow } from 'enzyme';
import BasicUserInfo from './BasicUserInfo';

describe('<BasicUserInfo />', () => {
    it('should render without errors', () => {
        const component = shallow(<BasicUserInfo
            loggedUserId={0}
            id={0}
            email={''}
            username={''} />);
        const wrapper = component.find('.basic-user-info');
        expect(wrapper.length).toBe(1);
    });
})