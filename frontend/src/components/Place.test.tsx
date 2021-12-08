import React from 'react';
import { mount } from 'enzyme';
import Place from './Place';
import * as reactRedux from "react-redux";

const stubInitialState = {
    user: {
        loggedUser: {
            id: 1,
            email: "ex1",
            username: "ex1",
            profile_image: "ex1",
            folders: [],
        },
    },
    post: {
        posts: [
            {
                id: 1,
                header_image: "ex1",
                thumbnail_image: "ex1",
                author_id: 1,
                author_name: "ex1",
                availableWithoutCar: true,
                comments: [
                    {
                        username: "ex1",
                        content: "ex1",
                        profile_image: "ex1",
                        id: 1,
                        created_at: "ex1",
                        author_id: "1,",
                    },
                ],
                days: 1,
                folder_id: 1,
                folder_name: "ex1",
                is_shared: true,
                location: "ex1",
                places: [
                    {
                        id: 1,
                        name: "ex1",
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
                    },
                    {
                        id: 2,
                        name: "ex2",
                        post_id: 1,
                        description: "ex2",
                        day: 1,
                        folder_id: 1,
                        latitude: "1",
                        longitude: "1",
                        lat: "1",
                        lon: "1",
                        homepage: "ex2",
                        phone_number: "ex2",
                        address: "ex2",
                        category: "ex2",
                        index: 2,
                    },
                ],
                season: "ex1",
                theme: "ex1",
                title: "ex1",
                like_counts: 1,
                liked: true,
            },
        ],
        detailedPost: {
            id: 1,
            header_image: "ex1",
            thumbnail_image: "ex1",
            author_id: 1,
            author_name: "ex1",
            availableWithoutCar: true,
            comments: [
                {
                    username: "ex1",
                    content: "ex1",
                    profile_image: "ex1",
                    id: 1,
                    created_at: "ex1",
                    author_id: 1,
                },
            ],
            comment_counts: 1,
            days: 1,
            // folder_id: 1,
            folder_name: "ex1",
            is_shared: true,
            location: "ex1",
            places: [
                {
                    id: 1,
                    name: "ex1",
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
                },
                {
                    id: 2,
                    name: "ex2",
                    post_id: 1,
                    description: "ex2",
                    day: 1,
                    folder_id: 1,
                    latitude: "1",
                    longitude: "1",
                    lat: "1",
                    lon: "1",
                    homepage: "ex2",
                    phone_number: "ex2",
                    address: "ex2",
                    category: "ex2",
                    index: 2,
                },
            ],
            season: "ex1",
            theme: "ex1",
            title: "ex1",
            like_counts: 1,
            liked: true,
            created_at: "ex1",
            pathList: [
                {
                    from_place_id: 1,
                    id: 1,
                    post_id: 1,
                    to_place_id: 2,
                    transportation: "car",
                },
            ],
        },
        selectedFolder: {
            id: 1,
            name: "ex1",
        },
        search: [],
        likeSorted: [],
        dateSorted: [],
    },
};

describe('<Place />', () => {
    it('should render without errors', () => {
        const onAddButton = jest.fn();
        jest
            .spyOn(reactRedux, "useSelector")
            .mockImplementation((callback) => callback(stubInitialState));
        let component = mount(<Place place={stubInitialState.post.posts[0].places[0]} icon={""} onClickButton={() => { }} key={1} onAddButton={onAddButton} />);
        const wrapper = component.find('.place-container');
        expect(wrapper.length).toBe(1);
        component.find(".post-icon").simulate("click");
        component.find(".post-icon").simulate("click");
        component = mount(<Place place={stubInitialState.post.posts[0].places[0]} icon={""} onClickButton={() => { }} key={1} />);
        component.find(".place-title").simulate("click");
    });
})
