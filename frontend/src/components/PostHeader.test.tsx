import React from 'react';
import { shallow } from 'enzyme';
import PostHeader from './PostHeader';

describe('<PostHeader />', () => {
    let post: any;

    beforeEach(() => {
        post = {
            id: 1,
            thumbnail_image: '',
            folder_name: '',
            title: '',
            author_name: '',
            author_id: 1,
            is_shared: true,
            location: '',
            days: 1,
            season: '',
            theme: '',
            like_counts: 1,
            comments: [],
            availableWithoutCar: true,
            liked: false,
            created_at: ''
        }
    })

    it('should render without errors when not logged in', () => {
        post.comment_counts = 1;
        post.comments = null;
        const component = shallow(<PostHeader loggedUserId={0} post={post} isPostDetail={false} onClickPostLikeButton={jest.fn()} />);
        const wrapper = component.find('.post-header');
        expect(wrapper.length).toBe(1);
    });

    it('should render without errors when logged in', () => {
        let component = shallow(<PostHeader loggedUserId={1} post={post} isPostDetail={true} onClickAddPostCartButton={jest.fn()} onClickPostLikeButton={jest.fn()} />);
        let wrapper = component.find('.unliked');
        expect(wrapper.length).toBe(1);

        post.liked = true;

        component = shallow(<PostHeader loggedUserId={1} post={post} isPostDetail={true} onClickAddPostCartButton={jest.fn()} onClickPostLikeButton={jest.fn()} />);
        wrapper = component.find('.liked');
        expect(wrapper.length).toBe(1);

        post.is_shared = false;

        component = shallow(<PostHeader loggedUserId={1} post={post} isPostDetail={true} onClickAddPostCartButton={jest.fn()} onClickPostLikeButton={jest.fn()} />);
        wrapper = component.find('.post-share-button');
        expect(wrapper.length).toBe(1);
    });

    it('should render post tags properly', () => {
        post.season = 'spr';
        post.theme = 'friends'

        let component = shallow(<PostHeader loggedUserId={1} post={post} isPostDetail={true} onClickPostLikeButton={jest.fn()} />);
        let wrapper = component.find('.season');
        expect(wrapper.text()).toEqual('Spring');

        post.season = 'sum';
        post.theme = 'family';

        component = shallow(<PostHeader loggedUserId={1} post={post} isPostDetail={true} onClickPostLikeButton={jest.fn()} />);
        wrapper = component.find('.season');
        expect(wrapper.text()).toEqual('Summer');

        post.season = 'aut';
        post.theme = 'lover';

        component = shallow(<PostHeader loggedUserId={1} post={post} isPostDetail={true} onClickPostLikeButton={jest.fn()} />);
        wrapper = component.find('.season');
        expect(wrapper.text()).toEqual('Autumn');

        post.season = 'win';
        post.theme = 'alone';

        component = shallow(<PostHeader loggedUserId={1} post={post} isPostDetail={true} onClickPostLikeButton={jest.fn()} />);
        wrapper = component.find('.season');
        expect(wrapper.text()).toEqual('Winter');
    });
})