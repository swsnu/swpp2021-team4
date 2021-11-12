import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import { connectRouter, ConnectedRouter } from "connected-react-router";
import { Route, Redirect, Switch } from "react-router-dom";
import { getMockStore } from "../test-utils/mocks";
import { history } from "../store/store";
import * as actionCreators from "../store/action/";
import UserInfo from "./UserInfo";

const stubInitialState = {
  users: [],
};

const mockStore = getMockStore(stubInitialState);

describe("<UserInfo />", () => {
  let userInfo: JSX.Element;

  beforeEach(() => {
    userInfo = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact render={() => <UserInfo />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  it("should render UserInfo Page", () => {
    const component = mount(userInfo);
    const wrapper = component.find(".userinfo-container");
    expect(wrapper.length).toBe(1);
  });
});
