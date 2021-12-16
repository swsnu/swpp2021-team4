import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, BrowserRouter } from "react-router-dom";
import EditProfile from "./EditProfile";
import { history } from "../store/store";
import { getMockStore } from "../test-utils/mocks";
import * as userAction from "../store/User/userAction";
import * as reactRedux from "react-redux";
import axios from "axios";

const stubInitialState = {
  user: {
    loggedUser: {
      id: 1,
      email: "email",
      username: "username",
      profile_image: "",
      folders: [],
    },
  },
};

const mockStore = getMockStore(stubInitialState);

describe("<EditProfile />", () => {
  let editProfile: JSX.Element;
  let spyEditProfileAction: any;
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
    jest
      .spyOn(reactRedux, "useSelector")
      .mockImplementation((callback) => callback(stubInitialState));
    spyEditProfileAction = jest
      .spyOn(userAction, "editProfileAction")
      .mockImplementation(() => jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render without errors", () => {
    jest
      .spyOn(reactRedux, "useSelector")
      .mockImplementation((callback) => callback(stubInitialState));
    const component = mount(editProfile);
    const wrapper = component.find(".edit-profile-container");
    expect(wrapper.length).toBe(1);
  });

  it("should change state properly", () => {
    // const setUserInputs = jest.fn();
    // let spyUseState: any;
    // spyUseState = jest.spyOn(React, "useState");
    // spyUseState.mockImplementation((userInputs: any) => [
    //   userInputs,
    //   setUserInputs,
    // ]);
    const component = mount(editProfile);
    component
      .find("#username")
      .simulate("change", { target: { value: "edited_username" } });
    component
      .find("#password")
      .simulate("change", { target: { value: "password" } });
    component
      .find("#password2")
      .simulate("change", { target: { value: "password" } });
    component.find(".edit-profile-btn").simulate("click");
  });

  it("should edit profile properly", () => {
    axios.post = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve(() => Promise.resolve({ status: 201 }))
      );
    const setIsEdited = jest.fn();
    const setUserInputs = jest.fn();
    let spyUseState: any;
    spyUseState = jest.spyOn(React, "useState");
    spyUseState.mockImplementation((isEdited: any) => [isEdited, setIsEdited]);
    spyUseState.mockImplementation((userInputs: any) => [
      userInputs,
      setUserInputs,
    ]);
    const component = mount(editProfile);
    component.find("#username").simulate("change", {
      target: { id: "username", value: "edited_username" },
    });
    component
      .find("#password")
      .simulate("change", { target: { id: "password", value: "password12" } });
    component
      .find("#password2")
      .simulate("change", { target: { id: "password2", value: "password12" } });
    component
      .find("#profile-image")
      .simulate("change", { target: { file: ["ex1.jpg"] } });
    component.find(".edit-profile-btn").simulate("click");
    expect(setUserInputs).toBeTruthy();
    expect(spyEditProfileAction).toHaveBeenCalled();
  });

  it("should not edit profile", () => {
    const component = mount(editProfile);
    component
      .find("#username")
      .simulate("change", { target: { id: "username", value: "" } });
    component
      .find("#password")
      .simulate("change", { target: { id: "password", value: "" } });
    component
      .find("#password2")
      .simulate("change", { target: { id: "password2", value: "" } });
    const button = component.find(".edit-profile-btn");
    button.simulate("click");
    component
      .find("#username")
      .simulate("change", { target: { id: "username", value: "user" } });
    component
      .find("#password")
      .simulate("change", { target: { id: "password", value: "22@@" } });
    component
      .find("#password2")
      .simulate("change", { target: { id: "password2", value: "" } });
    button.simulate("click");
    component
      .find("#username")
      .simulate("change", { target: { id: "username", value: "user" } });
    component
      .find("#password")
      .simulate("change", { target: { id: "password", value: "22@@" } });
    component
      .find("#password2")
      .simulate("change", { target: { id: "password2", value: "22" } });
    component
      .find("#username")
      .simulate("change", { target: { id: "username", value: "user" } });
    component
      .find("#password")
      .simulate("change", { target: { id: "password", value: "test2test2" } });
    component
      .find("#password2")
      .simulate("change", { target: { id: "password2", value: "test" } });
    button.simulate("click");
    component
      .find("#username")
      .simulate("change", { target: { id: "username", value: "user" } });
    component
      .find("#password")
      .simulate("change", { target: { id: "password", value: "test2test2" } });
    component
      .find("#password2")
      .simulate("change", { target: { id: "password2", value: "test2test2" } });
    button.simulate("click");
  });
  it("shoudl dnot", () => {
    jest.spyOn(reactRedux, "useSelector").mockImplementation((callback) =>
      callback({
        user: {
          loggedUser: {
            id: 1,
            email: "email",
            username: "username",
            profile_image: "ex1",
            folders: [],
          },
        },
      })
    );
    const component = mount(editProfile);
    expect(component.find(".profile-image-preview").length).toBe(1);
  });
});
