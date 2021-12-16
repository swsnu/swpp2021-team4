import React from 'react';
import { mount } from 'enzyme';
import MyRoutesSection from './MyRoutesSection';
import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getMockStore } from "../test-utils/mocks";

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
            author_id: 2,
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

jest.mock("../components/CreatePlaceCard", () => {
    return jest.fn(() => {
        return (
            <div className="spy-create-place-card">
                CreatePlaceCard
            </div>
        );
    });
});

jest.mock("../components/Path", () => {
    return jest.fn(() => {
        return (
            <div className="spy-path">
                Path
            </div>
        );
    });
});

describe('<MyRoutesSection />', () => {
    let myRoutesSection: any;
    const spySetPathList = jest.fn();
    const spyOnClickDeleteDay = jest.fn();
    const spyOnChangePath = jest.fn();
    const spyOnClickDay = jest.fn()
    const spyOnClickAddIcon = jest.fn()
    const spyOnChangePlaceDescription = jest.fn();
    const spyOnEditPlace = jest.fn();
    const spyOnDeletePlace = jest.fn();
    const spySetRoutePlaces = jest.fn();

    beforeEach(() => {
        myRoutesSection = (
            <Provider store={mockStore}>
                <DndProvider backend={HTML5Backend}>
                    <MyRoutesSection
                        days={0}
                        selectedDay={0}
                        routePlaces={[]}
                        pathList={{
                            ['']: {
                                to: '',
                                transportation: "car"
                            }
                        }}
                        setPathList={spySetPathList}
                        onClickDeleteDay={spyOnClickDeleteDay}
                        onChangePath={spyOnChangePath}
                        onClickDay={spyOnClickDay}
                        onClickAddIcon={spyOnClickAddIcon}
                        editPlace={{ id: 1, description: '1' }}
                        onChangePlaceDescription={spyOnChangePlaceDescription}
                        onEditPlace={spyOnEditPlace}
                        onDeletePlace={spyOnDeletePlace}
                        setRoutePlaces={spySetRoutePlaces}
                    />
                </DndProvider>
            </Provider>
        )
    })
    it('should render search without errors', () => {
        const component = mount(myRoutesSection);
        let wrapper = component.find('.my-routes-container');
        expect(wrapper.length).toBe(1);
        wrapper = component.find('.my-routes-places-container');
        expect(wrapper.length).toBe(1);
    });


})
