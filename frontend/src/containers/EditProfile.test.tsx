import React from 'react';
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, BrowserRouter } from "react-router-dom";
import EditProfile from './EditProfile';
import { history } from "../store/store";
import { getMockStore } from "../test-utils/mocks";
// import * as userAction from '../store/User/userAction';
import * as reactRedux from "react-redux";
// import axios from "axios";

const stubInitialState = {
    user: {
        loggedUser: {
            id: 1,
            email: "email",
            username: "username",
            profile_image: "",
            folders: [],
        }
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
                places: [],
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
                    author_id: "1,",
                },
            ],
            days: 1,
            folder_id: 1,
            folder_name: "ex1",
            is_shared: true,
            location: "ex1",
            places: [],
            season: "ex1",
            theme: "ex1",
            title: "ex1",
            like_counts: 1,
            liked: true,
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

describe('<EditProfile />', () => {
    let editProfile: JSX.Element;
    // let spyEditProfileAction: any;
    // let spyPush: any;
    jest.mock("axios");

    beforeEach(() => {
        editProfile = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <BrowserRouter>
                        <Route path="/" exact render={() => <EditProfile />} />
                    </BrowserRouter>
                </ConnectedRouter>
            </Provider>
        );
        // spyEditProfileAction = jest
        //     .spyOn(userAction, "editProfileAction")
        //     .mockImplementation(() => jest.fn());
        // spyPush = jest.spyOn(history, "push").mockImplementation(() => { });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render without errors', () => {
        jest
            .spyOn(reactRedux, "useSelector")
            .mockImplementation((callback) => callback(stubInitialState));
        const component = mount(editProfile);
        const wrapper = component.find('.edit-profile-container');
        expect(wrapper.length).toBe(1);
    });

    it("should change state properly", () => {
        jest
            .spyOn(reactRedux, "useSelector")
            .mockImplementation((callback) => callback(stubInitialState));
        const setUserInputs = jest.fn();
        let spyUseState: any;
        spyUseState = jest.spyOn(React, "useState");
        spyUseState.mockImplementation((userInputs: any) => [
            userInputs,
            setUserInputs,
        ]);
        const component = mount(editProfile);
        component.find("#username").simulate("change", { target: { value: "edited_username" } });
        component.find("#password").simulate("change", { target: { value: "password" } });
        component.find("#password2").simulate("change", { target: { value: "password" } });
        component.find(".edit-profile-btn").simulate("click");
    })

    // it("should edit profile properly", () => {
    //     jest
    //         .spyOn(reactRedux, "useSelector")
    //         .mockImplementation((callback) => callback(stubInitialState));
    //     axios.post = jest
    //         .fn()
    //         .mockImplementation(() => Promise.resolve(() => Promise.resolve({ status: 201 })));
    //     const setIsEdited = jest.fn();
    //     const setUserInputs = jest.fn();
    //     let spyUseState: any;
    //     spyUseState = jest.spyOn(React, "useState");
    //     spyUseState.mockImplementation((isEdited: any) => [
    //         isEdited,
    //         setIsEdited,
    //     ]);
    //     spyUseState.mockImplementation((userInputs: any) => [
    //         userInputs,
    //         setUserInputs,
    //     ]);
    //     const component = mount(editProfile);
    //     component.find("#username").simulate("change", { target: { value: "edited_username" } });
    //     component.find("#password").simulate("change", { target: { value: "password" } });
    //     component.find("#password2").simulate("change", { target: { value: "password" } });
    //     component.find(".edit-profile-btn").simulate("click");
    //     expect(setUserInputs).toHaveBeenCalled();
    // });

    // it("should not edit profile", () => {
    //     const component = mount(editProfile);
    //     jest.spyOn(window, 'alert');
    //     jest
    //         .spyOn(reactRedux, "useSelector")
    //         .mockImplementation((callback) => callback(stubInitialState));
    //     const setUserInputs = jest.fn();
    //     let spyUseState: any;
    //     spyUseState = jest.spyOn(React, "useState");
    //     spyUseState.mockImplementation((userInputs: any) => [
    //         userInputs,
    //         setUserInputs,
    //     ]);
    //     component.find("#username").simulate("change", { target: { value: "" } });
    //     const button = component.find(".edit-profile-btn");
    //     button.simulate("click");
    //     expect(window.alert).toHaveBeenCalled();

    //     component.find("#username").simulate("change", { target: { value: "user" } });
    //     component.find("#password").simulate("change", { target: { value: "password" } });
    //     component.find("#password2").simulate("change", { target: { value: "wrong_password" } });
    //     button.simulate("click");
    //     expect(window.alert).toHaveBeenCalled();
    // });
})