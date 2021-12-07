import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import {  ConnectedRouter } from "connected-react-router";
import { Route,  Switch, BrowserRouter } from "react-router-dom";
import Signin from './Signin';
import { getMockStore } from "../test-utils/mocks";
import { history } from "../store/store";
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
    const emailInput = component.find("#userEmail");
    emailInput.simulate("change", { target: { value: "s" } });
    const passwordInput = component.find("#userPassword");
    passwordInput.simulate("change", { target: { value: "s" } });
    const button = component.find(".signin-btn");
    button.simulate("click");
  });
 

  it("should click signin button", ()=>{
    const component = mount(signin);
    const button = component.find(".signin-btn");
    window.alert = jest.fn();

    let spyUseState: any;
    spyUseState = jest.spyOn(React, "useState");
    const setUserInputs = jest.fn();
    spyUseState.mockImplementation((userInputs: any) => [
      userInputs,
      setUserInputs,
    ]);
    button.simulate("click");
    const emailInput = component.find("#userEmail");
    emailInput.simulate("change", {
      target: { id: "userEmail", value: "email" },
    });

    expect(spyUseState).toBeTruthy();
    const passwordInput = component.find("#userPassword");
    passwordInput.simulate("change", {
      target: { id: "userPassword", value: "s" },
    });

    const setIsSigned = jest.fn();
    spyUseState.mockImplementation((isSigned: any) => [isSigned, setIsSigned]);
    axios.post = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ status: 201 }));
    button.simulate("click");
    expect(setIsSigned).toBeTruthy();
  })
});
