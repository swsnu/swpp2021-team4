import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import UserInfoPage from "./UserInfoPage";
import { getMockStore } from "../test-utils/mocks";
import { history } from "../store/store";

import * as reactRedux from 'react-redux';

const mockStore = getMockStore();

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
            <BrowserRouter>
                <Provider store={mockStore}>
                    <ConnectedRouter history={history}>
                        <Switch>
                            <Route path="/" exact render={
                                () => <UserInfoPage />} />
                        </Switch>
                    </ConnectedRouter>
                </Provider>
            </BrowserRouter>
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
                        email: "email2",
                        username: "username2",
                        profile_image: "",
                        folders: [],
                    }
                }
            }));
        const component = mount(userInfoPage);
        const wrapper = component.find("UserInfo");
        expect(wrapper.length).toBe(1);
    });
});
