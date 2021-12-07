import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import UserInfo from "./UserInfo";
import { getMockStore } from "../test-utils/mocks";
import { history } from "../store/store";
import * as reactRedux from "react-redux";
// import * as postAction from '../store/Post/postAction';
import axios from "axios";

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
                author_id: 2,
                author_name: "ex2",
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

const mockStore = getMockStore(stubInitialState);

jest.mock("../components/BasicUserInfo", () => {
    return jest.fn((props) => {
        return (
            <div className="spyBasicUserInfo">
                <div className="spyUsername">{props.username}</div>
            </div>
        );
    });
});

jest.mock("../components/PostHeader", () => {
    return jest.fn((props) => {
        return (
            <div className="spyPostHeader">
                <div className="spyPostTitle">{props.post.title}</div>
                <button className="spyLikeButton"
                    onClick={props.onClickPostLikeButton}>button</button>
            </div>
        );
    });
});

describe('<UserInfo />', () => {
    jest.mock("axios");
    let userInfo: JSX.Element;
    let spyGetPostAction: any;

    beforeEach(() => {
        userInfo = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <UserInfo loggedUser={{
                        id: 1,
                        email: "ex1",
                        username: "ex1",
                        profile_image: "ex1",
                        folders: [],
                    }} id={2} />
                </ConnectedRouter>
            </Provider>
        );

        // spyGetPostAction = jest
        //     .spyOn(postAction, "getPostAction")
        //     .mockImplementation(() => jest.fn());
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render without errors', () => {
        const component = mount(userInfo);
        const wrapper = component.find('.userinfo-container');
        expect(wrapper.length).toBe(1);
    });

    it('should get user info', () => {
        jest
            .spyOn(reactRedux, "useSelector")
            .mockImplementation((callback) => callback(stubInitialState));
        axios.get = jest
            .fn()
            .mockImplementation(() => Promise.resolve({ posts: stubInitialState.post.posts }));
        mount(userInfo);
        expect(axios.get).toHaveBeenCalled();
        // expect(spyGetPostAction).toHaveBeenCalled();
    });
})