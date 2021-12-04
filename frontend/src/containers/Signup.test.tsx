import React, { Dispatch, useState } from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import {  ConnectedRouter } from "connected-react-router";
import { Route,  Switch, BrowserRouter } from "react-router-dom";
import Signup from './Signup';
import { getMockStore } from "../test-utils/mocks";
import { history } from "../store/store";
import { useDispatch } from "react-redux";
import * as actionCreators from '../store/User/userAction'
import { UserDispatchType } from "../store/User/userInterfaces";
import axios from "axios";
const mockStore = getMockStore();

describe("<Signup />", () => {
  let signin: JSX.Element;

  beforeEach(() => {
    signin = (
      <BrowserRouter>
        <Provider store={mockStore}>
          <ConnectedRouter history={history}>
            <Switch>
              <Route path="/" exact render={() => <Signup />} />
            </Switch>
          </ConnectedRouter>
        </Provider>
      </BrowserRouter>
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render Signup Page", () => {
    const component = mount(signin);
    const wrapper = component.find(".signup-container");
    expect(wrapper.length).toBe(1);
  });

  it("should click signup button", () => {
    const component = mount(signin);
    const button = component.find(".signup-btn");
    window.alert = jest.fn();


    let spyUseState: any;
    spyUseState = jest.spyOn(React, "useState");
    const spySetEmail = jest.fn();
    spyUseState.mockImplementation((email: any) => [
        email,
      spySetEmail,
    ]);

    button.simulate("click");   
    expect(window.alert).toHaveBeenCalled();
    const email_input = component.find("#userEmail");
    email_input.simulate("change", { target: { value: "email" } });
    button.simulate("click");
    expect(window.alert).toHaveBeenCalled();

    const userName_input = component.find("#userName");
    userName_input.simulate("change", { target: { value: "s" } });
    button.simulate("click");
    const password_input = component.find("#userPassword");
    password_input.simulate("change", { target: { value: "s" } });
    const password_check_input = component.find("#checkUserPassword");
    password_check_input.simulate("change", { target: { value: "s" } });
   // const spyHistoryPush = jest.spyOn(history, 'push')
   // .mockImplementation(path => {});
    button.simulate("click");
   // expect(spyHistoryPush).toHaveBeenCalled();
  });

});
