import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import PostDetail from "./PostDetail";
import { getMockStore } from "../test-utils/mocks";
import { history } from "../store/store";
import * as postAction from "../store/Post/postAction";
import * as reactRedux from "react-redux";
import { BrowserRouter } from "react-router-dom";
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

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useParams: () => ({
    id: "1",
  }),
  useRouteMatch: () => ({ url: "/post/1/" }),
}));

jest.mock("../components/Map", () => {
  return jest.fn((props) => {
    return (
      <div className="spy-map-container">
        <div className="spy-map-title">Map</div>
        <div id="map" />
        {props.fromWhere !== "detail" && (
          <div className="spy-map-create-btn" onClick={props.onClickButton}>
            {props.fromWhere}
          </div>
        )}
      </div>
    );
  });
});

describe("<PostDetail/>", () => {
  jest.mock("axios");
  let postDetail: any;
  let spyGetPostAction: any;
  // let spyCartPostAction: any;
  // let spyGetCommentsAction: any;
  // let spyPush: any;
  beforeEach(() => {
    postDetail = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <BrowserRouter>
            <PostDetail />
          </BrowserRouter>
        </ConnectedRouter>
      </Provider>
    );
    spyGetPostAction = jest
      .spyOn(postAction, "getPostAction")
      .mockImplementation(() => jest.fn());

    // spyCartPostAction = jest
    //   .spyOn(postAction, "cartPostAction")
    //   .mockImplementation(() => jest.fn());

    // spyGetCommentsAction = jest
    //   .spyOn(postAction, "getCommentsAction")
    //   .mockImplementation(() => jest.fn());

    // spyPush = jest.spyOn(history, "push").mockImplementation(() => {});
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render PostDetail correctly", () => {
    jest
      .spyOn(reactRedux, "useSelector")
      .mockImplementation((callback) => callback(stubInitialState));
    const component = mount(postDetail);
    const wrapper = component.find(".post-detail-container");
    expect(wrapper.length).toBe(1);
  });

  it("should render like function correctly", async () => {
    const component = mount(postDetail);
    const wrapper = component.find("#like-icon");
    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ like_counts: 1 }));
    wrapper.simulate("click");
    expect(axios.get).toHaveBeenCalled();
    expect(spyGetPostAction).toHaveBeenCalled();
    // jest
    //   .spyOn(reactRedux, "useSelector")
    //   .mockImplementation((callback) => callback(stubInitialState));
    // component.find("#unlike-icon").simulate("click");
    // expect(axios.get).toHaveBeenCalled();
  });

  it("should not render like function when rejected", async () => {
    const component = mount(postDetail);
    const wrapper = component.find("#like-icon");
    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.reject(new Error("abc")));
    wrapper.simulate("click");
    expect(axios.get).toHaveBeenCalled();
  });

  it("should post new comment when button clicked", () => {
    jest
      .spyOn(reactRedux, "useSelector")
      .mockImplementation((callback) => callback(stubInitialState));
    const component = mount(postDetail);
    // let spyUseState: any;
    // // spyUseState = jest.spyOn(React, "useState");
    // // const spySetComment = jest.fn();
    // // spyUseState.mockImplementation((newComment: any) => [
    // //   newComment,
    // //   spySetComment,
    // // ]);
    component
      .find(".comment-input")
      .simulate("change", { target: { value: "ex1" } });
    const wrapper = component.find(".comment-submit");
    axios.post = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ status: 201 }));
    wrapper.simulate("click");
    expect(axios.post).toHaveBeenCalled();
    expect(component.find(".comment-input").text()).toBe("");
  });
  it("should not post new comments when empty", () => {
    jest
      .spyOn(reactRedux, "useSelector")
      .mockImplementation((callback) => callback(stubInitialState));
    const component = mount(postDetail);
    let spyUseState: any;
    spyUseState = jest.spyOn(React, "useState");
    const spySetComment = jest.fn();
    spyUseState.mockImplementation((newComment: any) => [
      newComment,
      spySetComment,
    ]);
    component
      .find(".comment-input")
      .simulate("change", { target: { value: "" } });
    const wrapper = component.find(".comment-submit");
    axios.post = jest.fn();
    wrapper.simulate("click");
    expect(axios.post).toHaveBeenCalledTimes(0);
  });

  it("should delete comment when button clicked", () => {
    jest
      .spyOn(reactRedux, "useSelector")
      .mockImplementation((callback) => callback(stubInitialState));
    const component = mount(postDetail);
    const wrapper = component.find("#delete-comment-button");

    jest.spyOn(window, "confirm").mockReturnValue(true);
    axios.delete = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ status: 200 }));
    wrapper.simulate("click");
    expect(axios.delete).toHaveBeenCalled();
  });
});
