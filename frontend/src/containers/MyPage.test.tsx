import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import MyPage from "./MyPage";
import { getMockStore } from "../test-utils/mocks";
import { history } from "../store/store";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import * as userAction from "../store/User/userAction";
import PlaceItem from "../components/PlaceItem";

const stubInitialState = {
  user: {
    loggedUser: {
      id: 1,
      email: "ex1",
      username: "ex1",
      profile_image: "ex1",
      folders: [
        { id: 1, name: "ex1" },
        { id: 2, name: "ex2" },
      ],
    },
  },
};

const mockStore = getMockStore(stubInitialState);

jest.mock("../components/PostItem", () => {
  return jest.fn((props) => {
    return <div className="spy-post-title">{props.title}</div>;
  });
});
jest.mock("../components/BasicUserInfo", () => {
  return jest.fn((props) => {
    return (
      <div className="spy-basic-user-info">
        <div className="image">
          {!props.profile_image && <img className="profileImage" src="" />}
          {props.profile_image && (
            <img className="profileImage" src={props.profile_image} />
          )}
        </div>
        <div className="basicInfo">
          <div className="email">
            <div className="field">E-mail</div>
            <div className="value">{props.email}</div>
          </div>
          <div className="line"></div>
          <div className="name">
            <div className="field">username</div>
            <div className="value">{props.username}</div>
          </div>
          <div className="line"></div>
          {props.loggedUserId === props.id && (
            <button className="edit-btn" onClick={props.onEditProfile}>
              Edit
            </button>
          )}
        </div>
      </div>
    );
  });
});

describe("<MyPage />", () => {
  let mypage: any;

  beforeEach(() => {
    mypage = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <BrowserRouter>
            <MyPage
              loggedUser={{
                id: 1,
                email: "ex1",
                username: "ex1",
                profile_image: "ex1",
                folders: [
                  { id: 1, name: "ex1" },
                  { id: 2, name: "ex2" },
                ],
              }}
              id={1}
            />
          </BrowserRouter>
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render without errors", () => {
    const component = mount(mypage);
    const wrapper = component.find(".userinfo-container");
    expect(wrapper.length).toBe(1);
  });

  it("should toggle up and down the folderList", () => {
    const component = mount(mypage);
    const wrapper = component.find(".button_up");
    wrapper.simulate("click");
    expect(component.find(".button_down").length).toBe(1);
    component.find(".button_down").simulate("click");
    expect(wrapper.length).toBe(1);
  });

  it("should navigate to edit profile", () => {
    const component = mount(mypage);
    component.find(".edit-btn").simulate("click");
    expect(history.location.pathname).toEqual("/");
  });
  it("should render folder item", () => {
    let spyEditFolderAction: any;
    spyEditFolderAction = jest.spyOn(userAction, "editFolderAction");
    jest.spyOn(window, "confirm").mockReturnValue(true);
    let spyDeleteFolderAction: any;
    spyDeleteFolderAction = jest.spyOn(userAction, "deleteFolderAction");
    axios.get = jest.fn().mockResolvedValue({
      my_posts: [
        {
          id: 1,
          thumbnail_image: "ex1",
          title: "ex1",
          author_name: "ex1",
          author_id: 1,
          like_count: 1,
          comment_count: 1,
          is_shared: true,
        },
      ],
      posts: [
        {
          id: 2,
          thumbnail_image: "ex2",
          title: "ex2",
          author_name: "ex2",
          author_id: 2,
          like_count: 2,
          comment_count: 2,
          is_shared: true,
        },
      ],
      places: [
        {
          id: 1,
          kakao_id: 1,
          name: "ex1",
          post_id: 1,
          description: "ex1",
          day: 1,
          index: 1,
          folder_id: 1,
          latitude: 1,
          longitude: 1,
          homepage: "ex1",
          phone_number: "ex1",
          address: "ex1",
          category: "ex1",
        },
      ],
    });
    const component = mount(mypage);
    const wrapper = component.find(".eachItem");
    expect(wrapper.length).toBe(2);
    wrapper.at(0).simulate("click");
    expect(axios.get).toHaveBeenCalled();
    const editImage = component.find(".edit-folder-icon").at(0);
    editImage.simulate("click");
    const editInput = component.find("#edit_folder_input");
    expect(editInput.length).toBe(1);
    editInput.simulate("change", { target: { value: "ex3" } });
    const inputImg = component.find(".folder_input_container img");
    inputImg.simulate("click");
    expect(spyEditFolderAction).toHaveBeenCalled();
    const deleteIcon = component.find(".delete-folder-icon").at(0);
    deleteIcon.simulate("click");
    expect(spyDeleteFolderAction).toHaveBeenCalled();
  });

  it("should render my posts correctly", async () => {
    let postList: any;
    postList = {
      my_posts: [
        {
          id: 1,
          thumbnail_image: "ex1",
          title: "ex1",
          author_name: "ex1",
          author_id: 1,
          like_count: 1,
          comment_count: 1,
          is_shared: true,
        },
      ],
      posts: [
        {
          id: 2,
          thumbnail_image: "ex2",
          title: "ex2",
          author_name: "ex2",
          author_id: 2,
          like_count: 2,
          comment_count: 2,
          is_shared: true,
        },
      ],
      places: [
        {
          id: 1,
          kakao_id: 1,
          name: "ex1",
          post_id: 1,
          description: "ex1",
          day: 1,
          index: 1,
          folder_id: 1,
          latitude: "1",
          longitude: "1",
          lat: "1",
          lon: "1",
          homepage: "ex1",
          phone_number: "ex1",
          address: "ex1",
          category: "ex1",
        },
      ],
    };

    axios.get = jest.fn(() => {
      return new Promise((resolve) => {
        const result = {
          status: 200,
          data: postList,
        };
        resolve(result);
      });
    });
    const component = mount(mypage);
    component.find(".eachItem").at(0).simulate("click");
    // expect(wrapper.text()).toBe("ex1");
    // const wrapper = component.find(PostItem);
    // expect(wrapper.first().text()).toBe("ex1");
  });
});
