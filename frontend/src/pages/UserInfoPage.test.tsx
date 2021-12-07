import React from "react";
import { mount } from "enzyme";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import UserInfoPage from "./UserInfoPage";
import { getMockStore } from "../test-utils/mocks";
import { history } from "../store/store";
import * as reactRedux from 'react-redux';

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
}

const mockStore = getMockStore(stubInitialState);

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useParams: () => ({
        id: '1'
    }),
    useRouteMatch: () => ({ url: '/user/1/' }),
}));

describe("<UserInfoPage />", () => {
    let userInfoPage: JSX.Element;

    beforeEach(() => {
        userInfoPage = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <BrowserRouter>
                        <UserInfoPage />
                    </BrowserRouter>
                </ConnectedRouter>
            </Provider>
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should render without errors", () => {
        const component = mount(userInfoPage);
        const wrapper = component.find(".UserInfoPage");
        expect(wrapper.length).toBe(1);
    });

    it("should render my page", () => {
        jest
            .spyOn(reactRedux, 'useSelector')
            .mockImplementation((callback) => callback({
                user: {
                    loggedUser: {
                        id: 1,
                        email: "email1",
                        username: "username1",
                        profile_image: "",
                        folders: [],
                    }
                }
            }));
        const component = mount(userInfoPage);
        const wrapper = component.find("MyPage");
        expect(wrapper.length).toBe(1);
    });

    it("should render user info", () => {
        jest
            .spyOn(reactRedux, 'useSelector')
            .mockImplementation((callback) => callback({
                user: {
                    loggedUser: {
                        id: 2,
                        email: "ex2",
                        username: "ex2",
                        profile_image: "ex2",
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
            }));
        const component = mount(userInfoPage);
        const wrapper = component.find("UserInfo");
        expect(wrapper.length).toBe(1);
    });
});