import React from 'react';
import { mount } from 'enzyme';
import CreatePlaceCard from './CreatePlaceCard';
import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getMockStore } from "../test-utils/mocks";

const place = {
    id: 1,
    kakao_id: 1,
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
}

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

describe('<CreatePlaceCard />', () => {
    let createPlaceCard: any;
    const spyIsPlaceInCart = jest.fn();
    const spyIsPlaceInRoute = jest.fn();
    const spyOnClickCartButton = jest.fn();
    const spyOnClickUncartButton = jest.fn();
    const spyOnAddPlace = jest.fn()
    const spyOnEditPlace = jest.fn()
    const spyOnChangePlaceDescription = jest.fn();
    const spySetPathList = jest.fn();
    const spySetRoutePlaces = jest.fn();

    beforeEach(() => {
        createPlaceCard = (
            <Provider store={mockStore}>
                <DndProvider backend={HTML5Backend}>
                    <CreatePlaceCard
                        id={0}
                        index={0}
                        todayPlaceList={[]}
                        place={place}
                        icon={""}
                        type={"search"}
                        isPlaceInCart={spyIsPlaceInCart}
                        isPlaceInRoute={spyIsPlaceInRoute}
                        onClickCartButton={spyOnClickCartButton}
                        onAddPlace={spyOnAddPlace}
                        editPlace={{ id: 1, description: '1' }}
                        onEditPlace={spyOnEditPlace}
                        onChangePlaceDescription={spyOnChangePlaceDescription}
                        selectedDay={1}
                        movePlace={jest.fn()}
                    />
                </DndProvider>
            </Provider>
        )
    })
    it('should render search without errors', () => {
        const component = mount(createPlaceCard);
        let wrapper = component.find('.create-place-container');
        expect(wrapper.length).toBe(1);
        wrapper = component.find('.place-cart-button');
        wrapper.simulate("click");
        wrapper = component.find('.post-icon.expand');
        wrapper.simulate("click");
    });

    it('should render place without errors', () => {
        const component = mount(
            <Provider store={mockStore}>
                <DndProvider backend={HTML5Backend}>
                    <CreatePlaceCard
                        id={1}
                        index={1}
                        todayPlaceList={[]}
                        place={place}
                        icon={""}
                        type={"place"}
                        isPlaceInCart={spyIsPlaceInCart}
                        isPlaceInRoute={spyIsPlaceInRoute}
                        onClickUncartButton={spyOnClickUncartButton}
                        onAddPlace={spyOnAddPlace}
                        selectedDay={4}
                        movePlace={jest.fn()}
                        setPathList={spySetPathList}
                        setRoutePlaces={spySetRoutePlaces}
                    />
                </DndProvider>
            </Provider>
        );
        let wrapper = component.find('.place-cart-button.delete');
        expect(wrapper.length).toBe(1);
        wrapper.simulate("click");
    });

    it('should render route without errors', () => {
        const component = mount(
            <Provider store={mockStore}>
                <DndProvider backend={HTML5Backend}>
                    <CreatePlaceCard
                        id={2}
                        index={2}
                        todayPlaceList={[]}
                        place={place}
                        icon={""}
                        type={"route"}
                        isPlaceInCart={spyIsPlaceInCart}
                        isPlaceInRoute={spyIsPlaceInRoute}
                        onAddPlace={spyOnAddPlace}
                        editPlace={{ id: 2, description: '1' }}
                        onEditPlace={spyOnEditPlace}
                        onChangePlaceDescription={spyOnChangePlaceDescription}
                        selectedDay={2}
                        movePlace={jest.fn()}
                        setPathList={spySetPathList}
                        setRoutePlaces={spySetRoutePlaces}
                    />
                </DndProvider>
            </Provider>
        );
        let wrapper = component.find('.post-icon.edit');
        expect(wrapper.length).toBe(1);
        wrapper.simulate("click");
    });

})
