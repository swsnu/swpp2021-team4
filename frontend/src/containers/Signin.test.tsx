import React, { Dispatch, useState } from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import {  ConnectedRouter } from "connected-react-router";
import { Route,  Switch, BrowserRouter } from "react-router-dom";
import Signin from './Signin';
import { getMockStore } from "../test-utils/mocks";
import { history } from "../store/store";
import { useDispatch } from "react-redux";
import * as actionCreators from '../store/User/userAction'
import { UserDispatchType } from "../store/User/userInterfaces";
import axios from "axios";
const mockStore = getMockStore();

describe("<Signin />", () => {
  let signin: JSX.Element;

  beforeEach(() => {
    signin = (
      <BrowserRouter>
        <Provider store={mockStore}>
          <ConnectedRouter history={history}>
            <Switch>
              <Route path="/" exact render={() => <Signin />} />
            </Switch>
          </ConnectedRouter>
        </Provider>
      </BrowserRouter>
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render Signin Page", () => {
    const component = mount(signin);
    const wrapper = component.find(".signin-container");
    expect(wrapper.length).toBe(1);
  });

  it("should click signin button", () => {
    const component = mount(signin);
    const email_input = component.find("#userEmail");
    email_input.simulate("change", { target: { value: "s" } });
    const password_input = component.find("#userPassword");
    password_input.simulate("change", { target: { value: "s" } });
    const button = component.find(".signin-btn");
    button.simulate("click");
    //const spySignin = jest
    //.spyOn(actionCreators, 'signinAction')
    //.mockImplementation((email_input: any, password_input: (value: boolean) => void) => (dispatch: Dispatch<UserDispatchType>) => Promise.resolve());
    //expect(spySignin).toHaveBeenCalledTimes(1);
  });
 
});
